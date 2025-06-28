import Button from "@/components/button";
import { InputField } from "@/components/fields/input-field";
import { SelectField } from "@/components/fields/select-field";
import { TextareaField } from "@/components/fields/textarea-field";
import { useUserForm, UserForm as Form } from "./user-form-utilities";

const genderOptions = [
  { value: "male", label: "男性" },
  { value: "female", label: "女性" },
  { value: "other", label: "その他" },
];

const maritalStatusOptions = [
  { value: "single", label: "独身" },
  { value: "married", label: "既婚" },
  { value: "divorced", label: "離婚" },
  { value: "widowed", label: "未亡人" },
];

export const UserForm = () => {
  const [form, fields] = useUserForm({
    onSubmit: (event, { submission }) => {
      event.preventDefault();
      if (submission?.status === "success") {
        console.log("フォーム送信成功:", submission.value);
      }
    },
    shouldRevalidate: "onBlur",
    shouldValidate: "onBlur",
    // 配列フィールドの初期化には空オブジェクトを使用（Discussion #716の回答より）
    defaultValue: {
      hobbies: [
        {
          name: "",
          description: "",
        },
      ],
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        ユーザー登録フォーム
      </h1>

      <Form form={form} className="space-y-6">
        {/* 基本情報セクション */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">基本情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              field={fields.name}
              label="氏名"
              placeholder="山田太郎"
              required
            />
            <InputField
              field={fields.email}
              label="メールアドレス"
              placeholder="example@email.com"
              required
            />
            <InputField
              field={fields.password}
              label="パスワード"
              placeholder="8文字以上"
              required
            />
            <InputField
              field={fields.confirmPassword}
              label="パスワード確認"
              placeholder="パスワードを再入力"
              required
            />
            <SelectField
              field={fields.gender}
              label="性別"
              options={genderOptions}
              required
            />
            <InputField
              field={fields.phoneNumber}
              label="電話番号"
              placeholder="090-1234-5678"
              required
            />
          </div>
        </div>

        {/* 住所情報セクション */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">住所情報</h2>
          <div className="grid grid-cols-1 gap-4">
            <TextareaField
              field={fields.address}
              label="住所"
              placeholder="詳細な住所を入力してください"
              rows={3}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                field={fields.city}
                label="市区町村"
                placeholder="東京都渋谷区"
                required
              />
              <InputField
                field={fields.state}
                label="都道府県"
                placeholder="東京都"
                required
              />
              <InputField
                field={fields.zipCode}
                label="郵便番号"
                placeholder="123-4567"
                required
              />
            </div>
            <InputField
              field={fields.country}
              label="国"
              placeholder="日本"
              required
            />
          </div>
        </div>

        {/* 詳細情報セクション */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">詳細情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              field={fields.maritalStatus}
              label="婚姻状況"
              options={maritalStatusOptions}
            />
            <InputField
              field={fields.children}
              label="子供の数"
              placeholder="0"
              description="お子様の人数を入力してください"
              inputMode="numeric"
            />
            <InputField
              field={fields.pets}
              label="ペットの数"
              placeholder="0"
              description="飼っているペットの数を入力してください"
              inputMode="numeric"
            />
          </div>
        </div>

        {/* 趣味セクション */}
        <div className="pb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            趣味・興味
          </h2>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              最大3つまで趣味を追加できます
            </p>

            {fields.hobbies.getFieldList().map((hobby, index) => {
              const hobbyFields = hobby.getFieldset();

              return (
                <div
                  key={hobby.key}
                  className="border border-gray-200 rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-md font-medium text-gray-700">
                      趣味 {index + 1}
                    </h3>
                    <Button
                      {...form.remove.getButtonProps({
                        name: fields.hobbies.name,
                        index,
                      })}
                      color="delete-secondary"
                      size="sm"
                      type="submit"
                    >
                      削除
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <InputField
                      field={hobbyFields.name}
                      label="趣味名"
                      placeholder="例: 読書"
                      required
                    />
                    <TextareaField
                      field={hobbyFields.description}
                      label="詳細"
                      placeholder="例: 小説やビジネス書を読むのが好きです"
                      rows={2}
                    />
                  </div>
                </div>
              );
            })}

            {fields.hobbies.getFieldList().length < 3 && (
              <Button
                {...form.insert.getButtonProps({
                  name: fields.hobbies.name,
                })}
                color="secondary"
                className="w-full"
                type="submit"
              >
                ＋ 趣味を追加
              </Button>
            )}

            {fields.hobbies.errors && (
              <div className="text-red-600 text-sm">
                {fields.hobbies.errors}
              </div>
            )}
          </div>
        </div>

        {/* 送信ボタン */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex gap-4">
            <Button type="submit">登録する</Button>
            <Button type="button" color="secondary">
              リセット
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};
