import {VStack, Heading, Center} from 'native-base'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react';
import { Image } from "react-native";

import Input from '../../components/Input';
import Button from '../../components/Button';

type FormDataProps = {
  cpf: string;
  password: string;
}

export default function SignIn() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (data: FormDataProps) => {
    try {
      setIsLoading(true); 
      console.log('Iniciando requisição de login...');
      const response = await fetch('https://sgcm.com.br/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      console.log('Resposta da requisição de login:', json);
      setIsLoading(false); 
    } catch (error) {
      console.error('Erro ao efetuar login:', error);
      setIsLoading(false); 
    }
  }

  return (
    <VStack bgColor='gray.500' flex={1} px={10} >
      <Center mt={40}>
      <Image
        source={require('../../assets/favicon.png')}
        alt='logo'
      />
        <Heading color='white' mb={4}>
          Login
        </Heading>

        <Controller 
          control={control}
          name='cpf'
          rules={{
            required: 'Informe o seu CPF',
            minLength: {
              value: 9,
              message: 'CPF deve possuir 11 dígitos'
            }
          }}
          render={({ field: { onChange } }) =>(
            <Input 
              placeholder='CPF' 
              placeholderTextColor='white' 
              errorMessage={errors.cpf?.message}
              onChangeText={onChange}
            />
          )}
        />

        <Controller 
          control={control}
          name='password'
          rules={{
            required: 'Informe sua senha'
          }}
          render={({ field: { onChange } }) => (
            <Input 
              placeholder='Senha' 
              placeholderTextColor='white'
              errorMessage={errors.password?.message}
              secureTextEntry
              onChangeText={onChange}
            />
          )}
        />

        <Button   
          title={isLoading ? 'Entrando...' : 'Entrar'} 
          onPress={handleSubmit(handleSignIn)} 
        />
      </Center>
    </VStack>
  );
}