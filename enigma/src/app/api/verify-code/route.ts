import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';

// Force dynamic rendering since this route handles user verification
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  // Connect to the database
  await dbConnect();

  try {
    const { username, code } = await request.json();
    const decodedUsername =
      typeof username === 'string' ? decodeURIComponent(username) : '';

    // Prefer lookup by username, but fall back to OTP-only lookup
    // in case the username in the URL/body doesn't match exactly.
    let user =
      decodedUsername
        ? await UserModel.findOne({ username: decodedUsername })
        : null;

    if (!user) {
      user = await UserModel.findOne({ verifyCode: code });
    }

    if (!user) {
      return Response.json(
        {
          success: false,
          message:
            'User not found for this verification code. Please sign up again.',
        },
        { status: 404 }
      );
    }

    // Check if the code is correct and not expired
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeValid && isCodeNotExpired) {
      // Update the user's verification status
      user.isVerified = true;
      await user.save();

      return Response.json(
        { success: true, message: 'Account verified successfully' },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      // Code has expired
      return Response.json(
        {
          success: false,
          message:
            'Verification code has expired. Please sign up again to get a new code.',
        },
        { status: 400 }
      );
    } else {
      // Code is incorrect
      return Response.json(
        { success: false, message: 'Incorrect verification code' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error verifying user:', error);
    return Response.json(
      { success: false, message: 'Error verifying user' },
      { status: 500 }
    );
  }
}