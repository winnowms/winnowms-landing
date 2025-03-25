import { FormData } from "@/utils/types/types";

export async function sendMail(data: FormData) {
  try {
    const response = await fetch("/api/v1/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to send email");
    }

    return { success: true, message: result.message };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
