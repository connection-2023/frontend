import Modal from '@/components/Modal/ReceiptModal';
import Receipt from '@/components/uis/Receipt';

const ReceiptModalPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => (
  <Modal>
    <Receipt searchParams={searchParams} />
  </Modal>
);

export default ReceiptModalPage;
