'use client';

import { useRouter, useParams } from 'next/navigation';
import Modal from '../../../../components/Modal/Modal';
import NotePreviewClient from './NotePreview.client';

export default function InterceptedNotePage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  return (
    <Modal onClose={() => router.back()}>
      <NotePreviewClient id={id} />
    </Modal>
  );
}