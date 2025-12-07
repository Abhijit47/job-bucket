import cloudinary from '@/configs';
import { requireAuth } from '@/lib/auth/requireAuth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { user } = await requireAuth();

  try {
    const payload = await req.formData();
    const publicId = payload.get('publicId') as string;
    // console.log('DELETE payload', payload);

    if (!publicId) {
      return NextResponse.json(
        { message: 'publicId is required.' },
        { status: 400, statusText: 'Bad Request' }
      );
    }

    // Verify ownership: ensure publicId belongs to this user's folder
    const expectedPrefix = `job-bucket/${user.role}s/${user.id}/`;
    if (!publicId.startsWith(expectedPrefix)) {
      return NextResponse.json(
        { message: 'Unauthorized to delete this resource.' },
        { status: 403, statusText: 'Forbidden' }
      );
    }

    await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
    });
    // console.log('Cloudinary delete response', deleteImage);

    return NextResponse.json(
      { success: true, message: 'File deleted successfully.' },
      { status: 200, statusText: 'OK' }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Unexpected error occurred during file deletion.',
        error: (error as Error).message,
      },
      { status: 500, statusText: 'Internal Server Error' }
    );
  }
}
