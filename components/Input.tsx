import { Input as NativeBaseInput, IInputProps, FormControl } from 'native-base'

type Props = IInputProps & {
  errorMessage?: string | null;
}

export default function Input({errorMessage = null, isInvalid, ...rest }: Props){
  const invalid = !!errorMessage || isInvalid;

  return(
    <FormControl mb={4} isInvalid={invalid}>
      <NativeBaseInput
        bg="gray.700"
        fontSize="md"
        h={16}
        isInvalid={invalid}
        _focus={{
          bgColor: "gray.500",
          borderWidth: 2,
          borderColor: "green.500"
        }}
        _invalid={{
          borderColor: "red.600"
        }}
        {...rest}
      />
      <FormControl.ErrorMessage>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}