import { useProductFormMetadata } from "../product-form-utilities";

interface FormActionsSectionProps {
  onReset: () => void;
  onSaveDraft?: () => void;
}

export const FormActionsSection = ({
  onReset,
  onSaveDraft,
}: FormActionsSectionProps) => {
  const formMetadata = useProductFormMetadata();

  // Conform FormMetadataから必要な情報を計算
  const isSubmitting =
    formMetadata.status === "error" || formMetadata.status === "success";
  const hasErrors = Boolean(
    formMetadata.errors && Object.keys(formMetadata.errors).length > 0
  );
  const errorCount = formMetadata.errors
    ? Object.keys(formMetadata.errors).length
    : 0;

  return (
    <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* エラー状況表示 */}
        <div className="flex-1">
          {hasErrors && (
            <div className="flex items-center text-red-600 text-sm">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{errorCount}個のエラーがあります</span>
            </div>
          )}

          {!hasErrors && (
            <div className="flex items-center text-green-600 text-sm">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>入力内容に問題はありません</span>
            </div>
          )}
        </div>

        {/* アクションボタン */}
        <div className="flex gap-3">
          {onSaveDraft && (
            <button
              type="button"
              onClick={onSaveDraft}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              下書き保存
            </button>
          )}

          <button
            type="button"
            onClick={onReset}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            リセット
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                登録中...
              </div>
            ) : (
              "商品を登録"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
