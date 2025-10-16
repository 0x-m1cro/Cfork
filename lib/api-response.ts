import { NextResponse } from "next/server";

/**
 * Standard API response format
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Create a success response
 */
export function successResponse<T>(data: T, message?: string, status = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
      ...(message && { message }),
    },
    { status }
  );
}

/**
 * Create an error response
 */
export function errorResponse(
  error: string,
  message?: string,
  status = 400
) {
  return NextResponse.json(
    {
      success: false,
      error,
      ...(message && { message }),
    },
    { status }
  );
}

/**
 * Validate required fields in request body
 */
export function validateRequiredFields(
  body: Record<string, any>,
  requiredFields: string[]
): { valid: boolean; missing?: string[] } {
  const missing = requiredFields.filter((field) => !body[field]);
  return {
    valid: missing.length === 0,
    ...(missing.length > 0 && { missing }),
  };
}
