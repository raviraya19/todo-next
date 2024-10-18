import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EditIcon,
  LogOutIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react";
import {
  deleteApiCall,
  getApiCall,
  postApiCall,
  updateApiCall,
} from "@/lib/api";
import ModalDialog from "@/components/modal-dialog";
import ConfirmDialog from "@/components/confirm-dialog";
import { format } from "date-fns";

const Dashboard = () => {
  const router = useNavigate();

  const [isContentLoaded, setIsContentLoaded] = useState(false);
  // addEditDialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // deleteConfirmationDialog
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  // tasksDataSource
  const [posts, setPosts] = useState<any>([]);

  // storingFormData
  const [formVal, setFormVal] = useState<any>("");

  // searchFilter
  const [search, setSearch] = useState("");

  // selectedTaskValues
  const [temp, setTemp] = useState("");

  // addEditDialogTypes
  const [dialogType, setDialogType] = useState<{ name: string; values?: any }>({
    name: "",
    values: null,
  });

  useEffect(() => {
    setIsContentLoaded(true);
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      router("/");
    }
  }, [router]);

   // hooks
   useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    postUpdate(formVal);
  }, [formVal]);

  const date = new Date();
  const displayDate = format(date, "MMMM dd ,yyyy");
  const filtered: any = !search
    ? posts
    : posts.filter((posts: any) =>
        posts.title.toLowerCase().includes(search.toLowerCase())
      );

  const handleSearchChange = (e: any) => {
    setSearch(e.target.value);
  };

 

  const getData = async () => {
    const { data }: any = await getApiCall();
    setPosts(data);
  };

  const postUpdate = async (formVal: any) => {
    if (formVal?.form_val?.length !== 0) {
      if (formVal?.form_type === "Add new Task") {
        const { status }: any = await postApiCall(formVal?.form_val);
        if (status == 201) {
          getData();
        }
      } else if (formVal?.form_type === "Edit Task") {
        const { status }: any = await updateApiCall(formVal.form_val);
        if (status == 200) {
          getData();
        }
      }
    }
  };

  const remove = (e: any) => {
    setTemp(e);
    setIsConfirmDialogOpen(true);
  };

  const deleted = async (val: any) => {
    const { status }: any = await deleteApiCall(val.id);
    if (status == 200) {
      getData();
    }
  };

  // dialogs
  const openAddDialog = () => {
    setIsDialogOpen(true);
    setDialogType({ name: "Add new Task" });
  };

  const openEditDialog = (e: any) => {
    setIsDialogOpen(true);
    setDialogType({ name: "Edit Task", values: e });
  };

  const logOut = () => {
    router("/");
  };


  if (!isContentLoaded) return <></>;

  return (
    <>
      {isDialogOpen && (
        <ModalDialog
          data={dialogType}
          isOpen={isDialogOpen}
          setIsOpen={setIsDialogOpen}
          formVal={setFormVal}
        />
      )}

      {isConfirmDialogOpen && (
        <ConfirmDialog
          isOpen={isConfirmDialogOpen}
          setIsOpen={setIsConfirmDialogOpen}
          deleted={deleted}
          data={temp}
        />
      )}

      <div className="container mx-auto p-4">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-semibold mb-8">TO-DO LIST</h1>
          <div
            className="mb-4 mr-1 cursor-pointer flex flex-col items-center justify-center"
            onClick={logOut}
          >
            <LogOutIcon className=" size-7 md:size-5" />
            <p className="text-sm font-medium">Logout</p>
          </div>
        </div>
        {/* menu */}
        <div className="mt-2 flex justify-between items-center flex-wrap">
          <div className="relative flex">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search task"
              className="relative m-0 -mr-0.5 block w-[200px] rounded-l border border-black border-solid  bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700"
            />
            <SearchIcon className="w-5 relative z-[2] -left-8 top-1" />
          </div>
          <div className="text-center text-lg text-gray-700 text-[15px] font-semibold">
            {displayDate}
          </div>
          <div className="w-full text-right sm:w-fit sm:text-center">
            <button
              type="button"
              className="inline-block rounded bg-primary py-3 px-4 text-sm font-medium leading-normal text-white bg-blue"
              onClick={() => openAddDialog()}
            >
              Add new Task
            </button>
          </div>
        </div>
        {/* tasks */}
        <div className="pt-6 sm:pt-4">
          <div className="flex flex-wrap gap-2 lg:gap-10 md:gap-5 sm:gap-4 justify-center lg:justify-start">
            {filtered?.length == 0 ? (
              <>
                <h5 className="mb-2 text-md font-medium text-black">
                  No Results Found
                </h5>
              </>
            ) : (
              <>
                {filtered?.map((e: any) => (
                  <div
                    key={e.id}
                    className="w-[250px] h-[200px] rounded-lg bg-blue p-4"
                  >
                    <h5 className="mb-2 text-2xl font-medium text-white">
                      {e.title}
                    </h5>
                    <p className="mb-8 text-lg font-normal text-white ">
                      {e.description}
                    </p>
                    <div className="text-white mb-1">{e.date}</div>
                    <hr className="mb-4 border border-t-1 border-gray-300 border-dashed text-white bg-white h-[1px]" />

                    <div className="flex justify-between w-full">
                      <div className="w-1/2">
                        <div className="text-white">
                          {e.completed ? (
                            <span className="bg-light_green text-dark_green text-xs font-medium rounded-full px-2 py-1">
                              completed
                            </span>
                          ) : (
                            <span className="bg-custom_yellow text-custom_brown text-xs font-medium px-2 py-1 rounded-full">
                              uncompleted
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-1/2">
                        <div>
                          <span className="flex justify-end space-x-3">
                            <div>
                              <Trash2Icon
                                className="size-5 cursor-pointer text-red-500"
                                onClick={() => remove(e)}
                              />
                            </div>
                            <div>
                              <EditIcon
                                className="size-5 cursor-pointer text-black"
                                onClick={() => openEditDialog(e)}
                              />
                            </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
