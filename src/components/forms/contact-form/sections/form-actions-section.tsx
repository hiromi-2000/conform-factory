import { Button } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { useContactFormMetadata } from "../contract-form-utilities";

interface FormActionsSectionProps {
  onReset: () => void;
}

export const FormActionsSection = ({ onReset }: FormActionsSectionProps) => {
  const form = useContactFormMetadata();

  return (
    <>
      {/* フォーム送信ボタン */}
      <div className="bg-gray-50 px-8 py-6 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            type="submit"
            className={twMerge(
              "flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl",
              "hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30",
              "disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed",
              "transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]",
              "shadow-lg hover:shadow-xl"
            )}
            isDisabled={!form.valid}
          >
            お問い合わせを送信
          </Button>

          <Button
            type="reset"
            className={twMerge(
              "px-8 py-4 border border-gray-300 text-gray-700 font-semibold rounded-xl",
              "hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-500/30",
              "transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]",
              "shadow-sm hover:shadow-md"
            )}
            onPress={onReset}
          >
            リセット
          </Button>
        </div>
      </div>

      {/* フォーム状態表示（開発用） */}
      {process.env.NODE_ENV === "development" && (
        <div className="mx-8 mb-8 p-4 bg-gray-900 rounded-xl">
          <h3 className="text-sm font-semibold text-gray-300 mb-2">
            開発用: フォーム状態
          </h3>
          <pre className="text-xs text-gray-400 overflow-auto">
            {JSON.stringify(
              {
                status: form.status,
                errors: form.allErrors,
                value: form.value,
                valid: form.valid,
              },
              null,
              2
            )}
          </pre>
        </div>
      )}
    </>
  );
};
