import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Restaurant Owner'];
  const roles = ['Restaurant Owner', 'Reservation Manager', 'Host', 'Admin', 'Customer'];
  const applicationName = 'TableReserve v2';
  const tenantName = 'Restaurant';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Restaurant Owner:
1. As a restaurant owner, I want to be able to create and manage my restaurant's profile on the platform, so that I can showcase my restaurant's offerings and attract more customers.
2. As a restaurant owner, I want to be able to view and analyze reservation data, so that I can make informed decisions about my restaurant's operations and marketing strategies.
3. As a restaurant owner, I want to be able to assign roles and permissions to my staff members, so that they can effectively use the platform to manage reservations and customer preferences.
4. As a restaurant owner, I want to be able to set up and customize table layouts and reservation rules, so that I can optimize my restaurant's occupancy and efficiency.
5. As a restaurant owner, I want to be able to receive notifications about new reservations, cancellations, and customer feedback, so that I can stay informed and make necessary adjustments.

Reservation Manager:
1. As a reservation manager, I want to be able to view, add, edit, and cancel reservations, so that I can efficiently manage the restaurant's bookings.
2. As a reservation manager, I want to be able to manage customer preferences and notes, so that we can provide personalized service and enhance customer satisfaction.
3. As a reservation manager, I want to be able to view and analyze reservation trends and customer data, so that I can make informed decisions about promotions and marketing efforts.
4. As a reservation manager, I want to be able to communicate with customers through the platform, so that I can confirm reservations, send reminders, and address any inquiries or concerns.

Host:
1. As a host, I want to be able to view and manage reservations for the day, so that I can efficiently seat customers and manage the restaurant's occupancy.
2. As a host, I want to be able to access customer preferences and notes, so that I can provide personalized service and enhance customer satisfaction.
3. As a host, I want to be able to quickly update table statuses and reservation details, so that I can keep the reservation system accurate and up-to-date.

Admin:
1. As an admin, I want to be able to manage user accounts and permissions, so that I can ensure the right people have access to the platform and its features.
2. As an admin, I want to be able to configure system settings and integrations, so that the platform works seamlessly with our existing tools and processes.
3. As an admin, I want to be able to monitor platform usage and performance, so that I can identify and address any issues or areas for improvement.

Customer:
1. As a customer, I want to be able to search for restaurants and view their profiles, so that I can find the perfect dining experience.
2. As a customer, I want to be able to make, modify, and cancel reservations easily, so that I can plan my dining experience with minimal hassle.
3. As a customer, I want to be able to provide my preferences and special requests, so that the restaurant can accommodate my needs and provide a personalized experience.
4. As a customer, I want to be able to receive notifications and reminders about my reservations, so that I can stay informed and manage my plans accordingly.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="20px" bottom="20px" zIndex={3}>
      <Popover placement="top">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody maxH="400px" overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application. Feel free to remove this tutorial with the{' '}
              <Box as="span" bg="yellow.300" p={1}>
                NEXT_PUBLIC_SHOW_BRIEFING
              </Box>{' '}
              environment variable.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
