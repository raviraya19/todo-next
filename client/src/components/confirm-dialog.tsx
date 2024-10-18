import { Dialog } from "@headlessui/react";

export default function ConfirmDialog(props: any) {
  const { data, isOpen, setIsOpen } = props;
  const closeDialog = () => {
    setIsOpen(false);
  };

  const deleteConfirm = () => {
    setIsOpen(false);
    props.deleted(data);
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => closeDialog()}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center  rounded-2xl shadow-xl">
          <Dialog.Panel className="w-full max-w-sm rounded bg-white p-5 shadow-lg">
            <Dialog.Title className="text-xl text-left font-medium text-black mb-1">
              Are you sure ?
            </Dialog.Title>
            <Dialog.Description className="text-lg font-normal text-gray-500">
              This {data?.name} will be deleted permanently.
            </Dialog.Description>
            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                className="text-white bg-red-500 font-medium rounded mx-2 py-2 px-5"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="text-white bg-blue font-medium rounded mx-2  py-2 px-5"
                onClick={deleteConfirm}
              >
                Confirm
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
