/* eslint-disable react/function-component-definition */
/* eslint-disable prettier/prettier */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

function BasicModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        bg="green.500"
        onClick={onOpen}
        sx={{
          "&:hover": {
            bg: "green.300",
          },
        }}
      >
        click me instead{" "}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Project Update</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h2>I hope this project finds you well</h2>
            <br />
            <p>
              This project is still under development. I'm currently
              implementing the Spotify API to provide you with a better
              experience
            </p>
            <br />
            <p>Click a playlist to render the player-bar!</p>
            <br />
            <p>Sign in to start listening: user@test.com | password</p>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="green.500"
              color="white"
              onClick={onClose}
              sx={{
                "&:hover": {
                  bg: "green.300",
                },
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BasicModal;
