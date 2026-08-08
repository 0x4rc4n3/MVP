import { initializeApp, getApps, getApp } from "firebase/app"
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth"
import {
  getFirestore,
  doc,
  getDocFromServer,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  type DocumentData,
} from "firebase/firestore"
import firebaseConfig from "../firebase-applet-config.json"

// Initialize Firebase App safely
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// Initialize Firestore with explicit database ID from config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId)
export const auth = getAuth(app)

// Google Auth Provider setup with Workspace Google Forms & Drive scopes
export const googleProvider = new GoogleAuthProvider()
googleProvider.addScope("https://www.googleapis.com/auth/forms.body")
googleProvider.addScope("https://www.googleapis.com/auth/forms.responses.readonly")
googleProvider.addScope("https://www.googleapis.com/auth/drive.file")

// In-memory access token cache (NOT in localStorage/sessionStorage as mandated by workspace skill)
let cachedAccessToken: string | null = null
let isSigningIn = false

export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string
  operationType: OperationType
  path: string | null
  authInfo: {
    userId?: string | null
    email?: string | null
    emailVerified?: boolean | null
    isAnonymous?: boolean | null
    tenantId?: string | null
    providerInfo?: {
      providerId?: string | null
      email?: string | null
    }[]
  }
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
) {
  const currentUser = auth.currentUser
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid,
      email: currentUser?.email,
      emailVerified: currentUser?.emailVerified,
      isAnonymous: currentUser?.isAnonymous,
      tenantId: currentUser?.tenantId,
      providerInfo:
        currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  }
  console.error("Firestore Error: ", JSON.stringify(errInfo))
  throw new Error(JSON.stringify(errInfo))
}

// Test connection on boot
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, "test", "connection"))
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("the client is offline")
    ) {
      console.error("Please check your Firebase configuration.")
    }
  }
}

// Auth State Initializer & Helper Functions
export const initAuth = (
  onAuthSuccess?: (user: User, token: string | null) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken)
    } else {
      cachedAccessToken = null
      if (onAuthFailure) onAuthFailure()
    }
  })
}

export const googleSignIn = async (): Promise<{
  user: User
  accessToken: string | null
} | null> => {
  try {
    isSigningIn = true
    const result = await signInWithPopup(auth, googleProvider)
    const credential = GoogleAuthProvider.credentialFromResult(result)
    cachedAccessToken = credential?.accessToken || null
    return { user: result.user, accessToken: cachedAccessToken }
  } catch (error) {
    console.error("Sign in error:", error)
    throw error
  } finally {
    isSigningIn = false
  }
}

export const getAccessToken = (): string | null => {
  return cachedAccessToken
}

export const logOut = async () => {
  await signOut(auth)
  cachedAccessToken = null
}

// Inquiry Firestore API
export interface InquiryData {
  id?: string
  userId: string
  userEmail: string
  userName: string
  orgName: string
  inquiryType: "pilot_cohort" | "crypto_audit" | "cofounder" | "general"
  message: string
  status: "submitted" | "in_review" | "connected"
  googleFormId?: string
  googleFormUrl?: string
  createdAt: string
}

export async function saveInquiryToFirestore(inquiry: Omit<InquiryData, "id">) {
  const path = "inquiries"
  try {
    const docRef = await addDoc(collection(db, path), inquiry)
    return { id: docRef.id, ...inquiry }
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path)
  }
}

export async function getUserInquiries(userId: string): Promise<InquiryData[]> {
  const path = "inquiries"
  try {
    const q = query(collection(db, path), where("userId", "==", userId))
    const querySnapshot = await getDocs(q)
    const list: InquiryData[] = []
    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...(doc.data() as InquiryData) })
    })
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, path)
    return []
  }
}
