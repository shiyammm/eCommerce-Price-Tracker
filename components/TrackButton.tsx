'use client';
import React, { FormEvent, Fragment } from 'react';
import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Input } from '@/components/ui/input';
import { addUserEmailToProduct } from '@/lib/actions';

interface Props {
  productId: string;
}

const TrackButton = ({ productId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [emailPrompt, setEmailPrompt] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleUpdateEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Add user
    await addUserEmailToProduct(productId, emailPrompt);
    setIsSubmitting(false);
    setEmailPrompt('');
    closeModal();
    console.log(emailPrompt);
  };

  return (
    <>
      <button onClick={openModal}>Track</button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog open={isOpen} onClose={closeModal}>
          <form action="" onSubmit={handleUpdateEmail}>
            <Input
              type="email"
              placeholder="Enter email"
              value={emailPrompt}
              onChange={(e) => setEmailPrompt(e.target.value)}
            />
            <button type="submit">
              {isSubmitting ? 'Submitting' : 'Submit'}
            </button>
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
          </form>
        </Dialog>
      </Transition>
    </>
  );
};

export default TrackButton;
