import { Button as NativeBaseButton, IButtonProps, Text } from 'native-base';

type Props = IButtonProps & {
  title: string;
} 
export default function Button({title, ...rest }: Props){
  return(
    <NativeBaseButton 
      w='full'
      h={16}
      bg="green.500"
      _pressed={{
        bgColor: 'green.700'
      }}
      {...rest}
    >
      <Text color='white' fontSize='md'>
        {title}
      </Text>
    </NativeBaseButton>
  )
}