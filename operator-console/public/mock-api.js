/**
 * ScatterID High-Fidelity Mock API Interceptor
 * Overrides window.fetch to simulate all dashboard backend routes client-side.
 * Activates automatically when running on Vercel, static file, or without Express server.
 */
(function() {
  const isVercel = window.location.hostname.includes('vercel') || window.location.hostname.includes('scatterid.tech');
  const isStaticFile = window.location.protocol === 'file:';
  const isLocalDevPort = window.location.port === '4000';
  
  // Activate mock mode if we are on Vercel, running statically, or not on the default Express port
  const enableMock = isVercel || isStaticFile || !isLocalDevPort;
  
  if (!enableMock) {
    console.log('[ScatterID Dashboard] Real backend mode active. Talking to Express server.');
    return;
  }
  
  console.log('[ScatterID Dashboard] Static Demo Mode Active. Intercepting API calls client-side.');

  // Helper to get/set state from SessionStorage to persist across tab updates
  function getState(key, defaultValue) {
    const val = sessionStorage.getItem(`mock_${key}`);
    if (val === null) {
      sessionStorage.setItem(`mock_${key}`, JSON.stringify(defaultValue));
      return defaultValue;
    }
    try {
      return JSON.parse(val);
    } catch (e) {
      return defaultValue;
    }
  }

  function setState(key, value) {
    sessionStorage.setItem(`mock_${key}`, JSON.stringify(value));
  }

  // --- INITIALIZE SIMULATED STATES ---
  const defaultShards = [
    { nodeId: 1, dbName: 'node_1.db', path: '/app/data/node_1.db', exists: true, sizeBytes: 24576, totalShares: 42, status: 'HEALTHY', integrityCheck: 'VALID' },
    { nodeId: 2, dbName: 'node_2.db', path: '/app/data/node_2.db', exists: true, sizeBytes: 24576, totalShares: 42, status: 'HEALTHY', integrityCheck: 'VALID' },
    { nodeId: 3, dbName: 'node_3.db', path: '/app/data/node_3.db', exists: true, sizeBytes: 24576, totalShares: 42, status: 'HEALTHY', integrityCheck: 'VALID' },
    { nodeId: 4, dbName: 'node_4.db', path: '/app/data/node_4.db', exists: true, sizeBytes: 24576, totalShares: 42, status: 'HEALTHY', integrityCheck: 'VALID' },
    { nodeId: 5, dbName: 'node_5.db', path: '/app/data/node_5.db', exists: true, sizeBytes: 24576, totalShares: 42, status: 'HEALTHY', integrityCheck: 'VALID' }
  ];

  const defaultCredentials = [
    {
      id: 'd50306b4-e831-4854-b5c0-b413c77a4e01',
      public_key: 'mldsa_public_key_bytes_hex_65...',
      prime_mod: '7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
      required_shares: 3,
      anchor_tx_id: 'a1a28254cb5b4a28a1d145eb3c21fc4a298833a65f9f9dbc63f5436bac2aa341',
      status: 'anchored',
      issued_at: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: '4d40f52b-21ca-4428-b9d9-d931dfa44452',
      public_key: 'mldsa_public_key_bytes_hex_65...',
      prime_mod: '7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
      required_shares: 3,
      anchor_tx_id: 'a1565fef8ef9d4b54574c21c55a098cce8dfbe2f4081e5cae4a312a941cca469',
      status: 'anchored',
      issued_at: new Date(Date.now() - 7200000).toISOString()
    }
  ];

  // Seed initial values
  let shards = getState('shards', defaultShards);
  let credentials = getState('credentials', defaultCredentials);
  let apiKey = getState('apiKey', 'scatterid-test-api-key-999');
  let quotaUsed = getState('quotaUsed', 42);

  // Helper to calculate healthy node counts
  const getHealthyCount = () => shards.filter(s => s.status === 'HEALTHY').length;

  // Intercepting fetch handler
  const originalFetch = window.fetch;
  window.fetch = async function(url, options) {
    let urlStr = '';
    if (typeof url === 'string') {
      urlStr = url;
    } else if (url instanceof URL) {
      urlStr = url.href;
    } else if (url && url.url) {
      urlStr = url.url;
    } else if (url) {
      urlStr = url.toString();
    }
    
    // Check if the URL contains /api/
    if (urlStr.includes('/api/')) {
      const apiIndex = urlStr.indexOf('/api/');
      let route = urlStr.substring(apiIndex + 5);
      route = route.split('?')[0]; // Strip query parameters
      
      const method = (options && options.method || 'GET').toUpperCase();
      
      console.log(`[Mock API Interceptor] ${method} /api/${route}`);
      
      // Simulate network latency (200-400ms)
      await new Promise(r => setTimeout(r, 200 + Math.random() * 200));

      // 1. GET /api/status
      if (route === 'status' && method === 'GET') {
        const hasMinShards = getHealthyCount() >= 3;
        return new Response(JSON.stringify({
          services: {
            cryptoService: 'RUNNING',
            verificationApi: hasMinShards ? 'RUNNING' : 'DEGRADED'
          },
          blockchain: {
            orderer: 'RUNNING',
            issuerPeer: 'RUNNING',
            verifierPeer: 'RUNNING'
          }
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      // 2. GET /api/shards/integrity
      if (route === 'shards/integrity' && method === 'GET') {
        shards = getState('shards', defaultShards);
        const healthyCount = getHealthyCount();
        let status = 'HEALTHY';
        if (healthyCount < 3) status = 'CRITICAL';
        else if (healthyCount < 5) status = 'DEGRADED';

        return new Response(JSON.stringify({
          success: true,
          healthyCount,
          threshold: 3,
          status,
          nodes: shards
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      // 3. POST /api/shards/toggle-container
      if (route === 'shards/toggle-container' && method === 'POST') {
        const body = JSON.parse(options.body);
        const nodeName = body.nodeName; // e.g. shard-node-3
        const action = body.action; // stop or start

        shards = getState('shards', defaultShards);
        const nodeId = parseInt(nodeName.replace(/\D/g, ''), 10);
        const idx = shards.findIndex(s => s.nodeId === nodeId);

        if (idx !== -1) {
          if (action === 'stop') {
            shards[idx].status = 'OFFLINE';
            shards[idx].sizeBytes = 0;
            shards[idx].totalShares = 0;
            shards[idx].integrityCheck = 'CONTAINER_STOPPED';
          } else {
            shards[idx].status = 'HEALTHY';
            shards[idx].sizeBytes = 24576;
            shards[idx].totalShares = 42;
            shards[idx].integrityCheck = 'VALID';
          }
          setState('shards', shards);
        }

        return new Response(JSON.stringify({
          success: true,
          nodeName,
          action,
          message: `Simulated container ${nodeName} ${action === 'stop' ? 'stopped' : 'started'} successfully.`
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      // 4. GET /api/credentials
      if (route === 'credentials' && method === 'GET') {
        credentials = getState('credentials', defaultCredentials);
        // Map shards to credentials based on the simulated status
        const healthyCount = getHealthyCount();
        const activeShardsList = shards.filter(s => s.status === 'HEALTHY').map(s => ({
          share_index: s.nodeId,
          containerUrl: `http://shard-node-${s.nodeId}:3000`
        }));

        const mappedCreds = credentials.map(c => ({
          ...c,
          shards: activeShardsList
        }));

        return new Response(JSON.stringify({
          success: true,
          credentials: mappedCreds
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      // 5. POST /api/issue
      if (route === 'issue' && method === 'POST') {
        const body = JSON.parse(options.body);
        const claim = body.claim || { sample: 'Enterprise Sandbox Identity' };

        const newId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });

        const newCred = {
          id: newId,
          public_key: 'mldsa_public_key_bytes_hex_65...',
          prime_mod: '7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
          required_shares: 3,
          anchor_tx_id: 'tx_' + Math.random().toString(36).substring(2, 15),
          status: 'anchored',
          issued_at: new Date().toISOString()
        };

        credentials = getState('credentials', defaultCredentials);
        credentials.unshift(newCred);
        setState('credentials', credentials);

        quotaUsed = getState('quotaUsed', 42) + 1;
        setState('quotaUsed', quotaUsed);

        // Build report based on healthy shards
        shards = getState('shards', defaultShards);
        const dispatchReport = shards.map(s => ({
          nodeId: s.nodeId,
          shareIndex: s.nodeId,
          containerUrl: `http://shard-node-${s.nodeId}:3000`,
          httpStatus: s.status === 'HEALTHY' ? 'WRITTEN' : 'FAILED',
          localDbStatus: s.status === 'HEALTHY' ? 'WRITTEN' : 'OFFLINE',
          shareHash: s.status === 'HEALTHY' ? Math.random().toString(16).substring(2, 18) + '...' : ''
        }));

        return new Response(JSON.stringify({
          status: 'anchored',
          credentialId: newId,
          dataHash: '9a14166f17f664ca99957f44132195200f4efbef9f9760ea8df4f1bdeecee752',
          algorithm: 'ML-DSA-65',
          anchorTxId: newCred.anchor_tx_id,
          dispatchReport,
          shares: { required: 3, total: 5 }
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      // 6. GET /api/logs/:container
      if (route.startsWith('logs/')) {
        const container = route.split('/')[1];
        
        let logs = `No logs available for ${container}`;
        if (container.includes('crypto')) {
          logs = `liboqs-python faulthandler is disabled
 * Serving Flask app 'app'
 * Debug mode: on
[+] PQC Core initialized: ML-DSA-65 bound from dynamic OQS C library.
[+] KMS Key Manager: Successfully connected to Vault at http://vault:8200
[+] Active Public Key: 10b61950d228b5dcb445fc47955ba3a8811422f...
[KMS Info] Loaded persisted public key history from disk.
INFO: 172.18.0.12 - - [${new Date().toISOString()}] "POST /package HTTP/1.1" 200 -`;
        } else if (container.includes('verification')) {
          logs = `Verification API listening on port 3000
[Gateway] Connected to Redis queue cache at redis://redis:6379
[Gateway] Local Shard database connection pool mapped to 5 nodes.
[Gateway] Fabric Client Network Config loaded for verifier.scatterid.com
[Gateway] Received request POST /issue - Authorized Default Tenant
[Gateway] Dispatching SSS shares 1..5 to SQLite Shards
[Gateway] Anchoring Transaction proof TxID: ${Math.random().toString(16).substring(2, 16)} to Hyperledger Fabric channel.`;
        } else if (container.includes('shard')) {
          logs = `Shard Node Service initialized on Port 3000.
[Storage] SQLite Engine mounted data volume.
[Storage] Schema verified: table 'shard_references' active.
[Storage] Received write request for share index ${container.replace(/\D/g, '')}
[Storage] Database transaction committed successfully.`;
        } else if (container.includes('billing')) {
          logs = `Billing Aggregator initialized. Connecting to Redis...
[Redis] Subscribed to pub/sub channel 'billing_usage_events'.
[Worker] Processing token request usage billing metrics.
[Worker] Updated quota counts in Gateway system database.`;
        } else if (container.includes('dashboard')) {
          logs = `Dashboard Service listening on port 4000.
[Proxy] Forwarding /api/status queries to verification-api.
[Docker] Connected to host socket /var/run/docker.sock.
[Proxy] Rotating settings API key profile.`;
        }

        return new Response(JSON.stringify({
          success: true,
          logs,
          content: logs
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      // 7. GET /api/settings
      if (route === 'settings' && method === 'GET') {
        apiKey = getState('apiKey', 'scatterid-test-api-key-999');
        quotaUsed = getState('quotaUsed', 42);
        
        // Simple hash simulation
        const hashedKey = 'de8f4fd028303bc23c23e0f108c54de5eb95eb31cf6ce72aa1ed0b52f0b2f55e';

        return new Response(JSON.stringify({
          success: true,
          tenantId: 'default-tenant',
          tier: 'enterprise',
          quotaLimit: 100000,
          quotaUsed,
          apiKeyPlaintext: apiKey,
          apiKeyHashed: hashedKey
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      // 8. POST /api/settings/rotate
      if (route === 'settings/rotate' && method === 'POST') {
        const rand = Math.random().toString(36).substring(2, 12);
        const newKey = `scatterid-default-tenant-key-${rand}`;
        setState('apiKey', newKey);
        
        return new Response(JSON.stringify({
          success: true,
          newKeyPlaintext: newKey,
          newKeyHashed: 'hash_of_' + rand
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      // 9. POST /api/diagnostics/run
      if (route === 'diagnostics/run' && method === 'POST') {
        shards = getState('shards', defaultShards);
        const healthyCount = getHealthyCount();
        const logs = [];
        const addLog = (step, detail, status = 'info') => {
          logs.push({ timestamp: new Date().toISOString(), step, detail, status });
        };

        addLog('Start', 'Initiating E2E Diagnostics Smoke Test', 'info');
        addLog('Verification API Check', 'Verification API is active on port 3000', 'success');
        addLog('Crypto Service Check', 'Crypto Service is active on port 5001', 'success');
        
        addLog('Credential Issuance', 'Sending POST request to http://verification-api:3000/issue', 'info');
        
        if (healthyCount < 3) {
          addLog('Credential Issuance', `API rejected issuance request: Shards are degraded below minimum threshold. Active shards: ${healthyCount}`, 'error');
          return new Response(JSON.stringify({ success: false, logs }), { status: 200, headers: { 'Content-Type': 'application/json' } });
        }

        const newId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          const r = Math.random() * 16 | 0;
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });

        addLog('Credential Issuance', `Successfully issued. Credential ID: ${newId}. TxID: tx_${Math.random().toString(36).substring(2, 10)}`, 'success');
        addLog('Credential Verification', `Sending POST request to http://verification-api:3000/verify for ${newId}`, 'info');
        addLog('Credential Verification', `Verification SUCCEEDED. Anchor Status: active`, 'success');

        return new Response(JSON.stringify({ success: true, logs }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }
    }
    
    // Pass-through all other normal requests
    return originalFetch.apply(this, arguments);
  };
})();
