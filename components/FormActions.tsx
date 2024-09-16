import TextButton from "./TextButton";
import MyView from "./MyView";

export default function FormActions({
  cancel,
  submit,
  submitText,
  submitDisabled = false,
}: {
  cancel: () => void;
  submit: () => void;
  submitText: string;
  submitDisabled?: boolean;
}) {
  return (
    <MyView row separate marginVertical={10}>
      <TextButton onPress={cancel} text="Cancel" marginRight={5} />
      <TextButton
        type="primary"
        onPress={submit}
        text={submitText}
        disabled={submitDisabled}
        marginLeft={5}
      />
    </MyView>
  );
}
