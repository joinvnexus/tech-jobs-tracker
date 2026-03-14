// Payment utility for SSLCommerz (Bangladesh)
// This is a placeholder implementation - actual integration requires SSLCommerz API credentials

interface PaymentRequest {
  amount: number
  currency?: string
  orderId: string
  customerName: string
  customerEmail: string
  customerMobile: string
  productName: string
}

interface PaymentResponse {
  success: boolean
  paymentUrl?: string
  sessionKey?: string
  error?: string
}

// Note: This requires SSLCommerz API credentials to be set in environment variables
const STORE_ID = process.env.SSL_STORE_ID
const STORE_PASSWORD = process.env.SSL_STORE_PASSWORD
const STORE_URL = process.env.SSL_STORE_URL || "https://sandbox.sslcommerz.com"

export async function initiatePayment(request: PaymentRequest): Promise<PaymentResponse> {
  // Check if SSLCommerz is configured
  if (!STORE_ID || !STORE_PASSWORD) {
    console.warn("[payment] SSLCommerz not configured, skipping payment")
    return {
      success: false,
      error: "Payment system not configured. Please contact support.",
    }
  }

  try {
    const postData = {
      store_id: STORE_ID,
      store_passwd: STORE_PASSWORD,
      total_amount: request.amount.toString(),
      currency: request.currency || "BDT",
      tran_id: request.orderId,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
      fail_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/fail`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel`,
      ipn_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/payment/webhook`,
      product_name: request.productName,
      product_category: "Job Posting",
      cus_name: request.customerName,
      cus_email: request.customerEmail,
      cus_mobile: request.customerMobile,
      cus_add1: "",
      cus_city: "",
      cus_postcode: "",
      cus_country: "Bangladesh",
    }

    const formBody = Object.entries(postData)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join("&")

    const response = await fetch(`${STORE_URL}/gwprocess/v4/api.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    })

    const data = await response.json()

    if (data?.GatewayPageURL) {
      return {
        success: true,
        paymentUrl: data.GatewayPageURL,
        sessionKey: data.sessionkey,
      }
    } else {
      return {
        success: false,
        error: data?.failedreason || "Payment initialization failed",
      }
    }
  } catch (error) {
    console.error("[payment] Payment error:", error)
    return {
      success: false,
      error: "An error occurred while processing payment",
    }
  }
}

export async function validatePayment(sessionKey: string): Promise<boolean> {
  if (!STORE_ID || !STORE_PASSWORD) {
    return false
  }

  try {
    const response = await fetch(`${STORE_URL}/validator/api/validitychecker`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        store_id: STORE_ID,
        store_passwd: STORE_PASSWORD,
        sessionkey: sessionKey,
        val_id: "any", // For checking transaction status
      }),
    })

    const data = await response.json()
    return data?.status === "VALID"
  } catch (error) {
    console.error("[payment] Validation error:", error)
    return false
  }
}

// Job posting pricing
export const JOB_POSTING_PRICES = {
  STANDARD: {
    price: 500, // BDT
    days: 30,
    features: ["Basic listing", "Standard visibility"],
  },
  PREMIUM: {
    price: 1000, // BDT
    days: 60,
    features: ["Featured listing", "Premium visibility", "Social media promotion"],
  },
  ENTERPRISE: {
    price: 2500, // BDT
    days: 90,
    features: [
      "Featured listing",
      "Premium visibility",
      "Social media promotion",
      "Email campaign",
      "Priority support",
    ],
  },
} as const

export type JobPostingPlan = keyof typeof JOB_POSTING_PRICES
