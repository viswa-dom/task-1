import { useEffect, useState } from 'react';
import './App.css';
import { Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text, Divider, HStack } from '@chakra-ui/react';

type DisplayData = {
  displayName: string;
  displayBrand: string;
  country: string;
  organization: string;
  alias: string;
};

const LOCAL_STORAGE_KEY = 'submittedDisplays';

function App() {
  const [formData, setFormData] = useState<DisplayData>({
    displayName: '',
    displayBrand: '',
    country: '',
    organization: '',
    alias: ''
  });

  const [submittedData, setSubmittedData] = useState<DisplayData[]>([]);

  // Load submitted data from localStorage on initial render
  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      setSubmittedData(JSON.parse(storedData));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
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

    const updatedData = [...submittedData, formData];
    setSubmittedData(updatedData);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));

    setFormData({
      displayName: '',
      displayBrand: '',
      country: '',
      organization: '',
      alias: ''
    });
  };

  const handleRemove = (indexToRemove: number) => {
    const updatedData = submittedData.filter((_, index) => index !== indexToRemove);
    setSubmittedData(updatedData);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Box p={5}>
      <Heading mb={4}>Display Registration Form</Heading>
      <VStack spacing={4} align="stretch" className='vstack'>
        <FormControl>
          <FormLabel>Display Name</FormLabel>
          <Input name="displayName" value={formData.displayName} onChange={handleChange} onKeyDown={handleKeyDown} />
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
        <Button colorScheme="blue" onClick={handleSubmit} className='button'>
          Submit
        </Button>

        <Divider />

        <Heading size="md" mt={4}>Submitted Displays</Heading>
        {submittedData.length === 0 ? (
          <Text>No displays submitted yet.</Text>
        ) : (
          submittedData.map((item, index) => (
            <Box key={index} p={3} borderWidth="1px" borderRadius="md" mb={3} className='box'>
              <Text><strong>Name:</strong> {item.displayName}</Text>
              <Text><strong>Brand:</strong> {item.displayBrand}</Text>
              <Text><strong>Country:</strong> {item.country}</Text>
              <Text><strong>Organization:</strong> {item.organization}</Text>
              <Text><strong>Alias:</strong> {item.alias}</Text>
              <HStack justify="flex-end" mt={2}>
                <Button size="sm" colorScheme="red" onClick={() => handleRemove(index)}>Remove</Button>
              </HStack>
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
}

export default App;
