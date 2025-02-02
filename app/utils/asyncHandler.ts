type SuccessCallback<T> = (data: T) => void;
type ErrorCallback = (error: any) => void;

export const asyncHandler = async <T>(
  asyncFunction: () => Promise<T>,
  onSuccess: SuccessCallback<T>,
  onError: ErrorCallback
): Promise<void> => {
  try {
    const data = await asyncFunction();
    onSuccess(data); // 성공 시 onSuccess 호출
  } catch (error) {
    onError(error); // 오류 발생 시 onError 호출
  }
};
