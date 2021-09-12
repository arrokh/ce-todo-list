import { Avatar, Box, Center, Checkbox, Divider, Heading, Input, List, ListItem, Stack } from '@chakra-ui/react'
import { motion, useAnimation } from 'framer-motion';
import type { NextPage } from 'next'
import Head from 'next/head';
import React, { FormEvent, useEffect, useState } from 'react'

const Home: NextPage = () => {
  const [todo, setTodo] = useState<string>('');
  const [todoList, setTodoList] = useState<Array<string>>([]);

  function onSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (todo.length < 3)
      return;

    setTodoList([
      ...todoList,
      todo,
    ]);
    setTodo('');
  }

  function removeItemAt(index: number) {
    setTodoList(
      todoList.filter((_, i) => i !== index)
    );
  }

  return (
    <Box height={'100vh'} width={'100%'}>
      <Head>
        <title>Coding Experiments | Todo List</title>
      </Head>
      <Center height={'100%'}>
        <Box
          width={'96'}
          minHeight={'40'}
          shadow={'md'}
          rounded={'md'}
          padding={'3'}
        >
          <Stack
            direction={'row'}
            justifyContent={'space-between'}
          >
            <Heading size={'md'}>My Todo List</Heading>
            <Avatar src={'https://avatar-endpoint.herokuapp.com/api/'} size={'sm'} />
          </Stack>
          <Divider marginY={'2'} />
          <form onSubmit={onSubmitHandler}>
            <Input rounded={'md'} size={'xs'} value={todo} onChange={e => setTodo(e.currentTarget.value)} />
          </form>
          <List marginTop={'2'}>
            {todoList.map((v, i) => (
              <ItemComponents key={i} value={v} onChange={() => removeItemAt(i)} />
            ))}
          </List>
        </Box>
      </Center>
    </Box>
  )
}

export default Home

interface IItemComponents {
  value?: string,
  onChange?: () => void,
}

const ItemComponents = (props: IItemComponents) => {
  const [checked, setChecked] = useState<boolean>(false);
  const animController = useAnimation();

  function onChangeHandler() {
    setChecked(true);
    setTimeout(async () => {
      await animController.start({
        opacity: 0,
      });
      props?.onChange?.();
      setChecked(false);
      await animController.start({
        opacity: 1,
      });
    }, 200);
  }

  useEffect(() => {
    animController.start({
      opacity: [.7, 1],
      y: [3, 0],
      transition: {
        duration: .2,
      },
    });
  }, []);

  return (
    <ListItem>
      <motion.div animate={animController}>
        <Checkbox isChecked={checked} onChange={onChangeHandler}>{props?.value}</Checkbox>
      </motion.div>
    </ListItem>
  );
}