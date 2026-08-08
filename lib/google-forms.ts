export interface CreateGoogleFormOptions {
  accessToken: string
  orgName: string
  inquiryType: string
  message: string
  userEmail: string
}

export interface GoogleFormResult {
  formId: string
  formUrl: string
  responderUri: string
  title: string
}

export async function createEnterpriseGoogleForm({
  accessToken,
  orgName,
  inquiryType,
  message,
  userEmail,
}: CreateGoogleFormOptions): Promise<GoogleFormResult> {
  // 1. Create a Google Form via REST API
  const createRes = await fetch("https://forms.googleapis.com/v1/forms", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      info: {
        title: `ScatterID Pilot Inquiry — ${orgName}`,
        documentTitle: `ScatterID Inquiry (${orgName})`,
      },
    }),
  })

  if (!createRes.ok) {
    const errText = await createRes.text()
    throw new Error(`Google Forms API Error (${createRes.status}): ${errText}`)
  }

  const formData = await createRes.json()
  const formId = formData.formId
  const responderUri = formData.responderUri || `https://docs.google.com/forms/d/${formId}/viewform`
  const formUrl = `https://docs.google.com/forms/d/${formId}/edit`

  // 2. Add question items to the created form using batchUpdate
  const batchRes = await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      requests: [
        {
          createItem: {
            item: {
              title: "Organization / Enterprise Node Name",
              description: `Submitted by ${userEmail}`,
              questionItem: {
                question: {
                  required: true,
                  textQuestion: {},
                },
              },
            },
            location: { index: 0 },
          },
        },
        {
          createItem: {
            item: {
              title: "Inquiry Type",
              questionItem: {
                question: {
                  required: true,
                  choiceQuestion: {
                    type: "RADIO",
                    options: [
                      { value: "Enterprise Pilot Partner Cohort" },
                      { value: "Post-Quantum Cryptographic Audit" },
                      { value: "Co-Founder / Systems Engineering" },
                      { value: "General Technical Inquiry" },
                    ],
                  },
                },
              },
            },
            location: { index: 1 },
          },
        },
        {
          createItem: {
            item: {
              title: "Technical Requirements & Proposal Message",
              questionItem: {
                question: {
                  required: true,
                  textQuestion: { paragraph: true },
                },
              },
            },
            location: { index: 2 },
          },
        },
      ],
    }),
  })

  if (!batchRes.ok) {
    console.warn("Failed to populate form items via batchUpdate, but form was created:", await batchRes.text())
  }

  return {
    formId,
    formUrl,
    responderUri,
    title: formData.info?.title || `ScatterID Inquiry (${orgName})`,
  }
}
