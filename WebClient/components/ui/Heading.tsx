import React from 'react';
import Container from "./Container";

type Props = {
  children: React.ReactNode
}

const Heading: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-white dark:bg-transparent dark:border-b dark:border-zinc-800 text-3xl font-medium pt-8 mb-5">
      <Container>
        {children}
      </Container>
    </div>
  );
};

export default Heading;