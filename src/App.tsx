import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, Divider } from '@chakra-ui/react';

type DisplayData = {
  displayName: string;
  displayBrand: string;
  country: string;
  organization: string;
  alias: string;
};

function App() {

  const [formData, setformData] = useState<DisplayData>({
    displayName: '',
    displayBrand: '',
    country: '',
    organization: '',
    alias: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
  const isEmptyField = Object.values(formData).some(value => value.trim() === '');
  
  if (isEmptyField) {
    alert('Please fill in all fields before submitting.');
    return;
  }
    setSubmittedData((prev) => [...prev, formData]);
    setformData({
      displayName: '',
      displayBrand: '',
      country: '',
      organization: '',
      alias: ''
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) =>{
    if(e.key === 'Enter'){
      handleSubmit();
    }
  }

  const [submittedData, setSubmittedData] = useState<DisplayData[]>([]);



  return (
    <Box>
      <Heading>Display Registration Form</Heading>
      <VStack className='vstack'>
        <FormControl>
          <FormLabel>Display Name</FormLabel>
          <Input name="displayName" value={formData.displayName} onChange={handleChange} onKeyDown={handleKeyDown}/>
        </FormControl>
        <FormControl>
          <FormLabel>Display Brand</FormLabel>
          <Input name="displayBrand" value={formData.displayBrand} onChange={handleChange} onKeyDown={handleKeyDown} />
        </FormControl>
        <FormControl>
          <FormLabel>Country</FormLabel>
          <Input name="country" value={formData.country} onChange={handleChange} onKeyDown={handleKeyDown} />
        </FormControl>
        <FormControl>
          <FormLabel>Organization</FormLabel>
          <Input name="organization" value={formData.organization} onChange={handleChange} onKeyDown={handleKeyDown} />
        </FormControl>
        <FormControl>
          <FormLabel>Alias</FormLabel>
          <Input name="alias" value={formData.alias} onChange={handleChange} onKeyDown={handleKeyDown} />
        </FormControl>
        <Button onClick={handleSubmit}>
          Submit
        </Button>
        <Divider />
        <Heading>Submitted Displays</Heading>
        {submittedData.map((item, index) => (
          <Box key={index} p={3} borderWidth="1px" borderRadius="md" mb={3} className='box'>
            <Text><strong>Name:</strong> {item.displayName}</Text>
            <Text><strong>Brand:</strong> {item.displayBrand}</Text>
            <Text><strong>Country:</strong> {item.country}</Text>
            <Text><strong>Organization:</strong> {item.organization}</Text>
            <Text><strong>Alias:</strong> {item.alias}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}

export default App
