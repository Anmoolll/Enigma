import { resend} from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmails";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse>{
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Enigma | Verification Code',
            react: VerificationEmail({username: username, otp: verifyCode}),
          });
        return{ success: true, message: 'Verification Email sent successfully' }
    } catch (EmailError) {
        console.log("Error sending verification email", EmailError);
        return{ success: false, message: 'failed to send Verification Email' }
    }
}