import React, { useState, useEffect } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getSearchUserProfileData } from "../../redux/AuthSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SearchUserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tokn = useSelector((state) => state.auth.accessToken);
  

  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [userProfile, setUserProfile] = useState("");
  console.log("userProfile", userProfile);

 

  useEffect(() => {
    const getUserName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/social-media/profile/u/${query}`,
          {
            headers: {
              Authorization: `Bearer ${tokn}`,
            },
          }
        );
        if (response?.data) {
          setUserProfile(response?.data);
          dispatch(getSearchUserProfileData(response?.data))
        }
      } catch (error) {
      }
    };
    getUserName();
  }, [query, setQuery]);

  const filteredPeople =
    query === ""
      ? Object.values(userProfile && userProfile)
      : Object.values(userProfile && userProfile).filter((person) =>
          person?.account?.username?.toLowerCase().includes(query.toLowerCase())
        );

  console.log("filtered people", filteredPeople);

  return (
    <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
      <div className="relative mt-4">
      {/* <h3 className=" font-fontNunito text-lg text-white ">Search People Profile</h3> */}
        <Combobox.Input
          className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(person) => person?.username}
          placeholder="Search Profile"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredPeople && filteredPeople.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPeople.map((person) => (
              <Combobox.Option
                // key={person?.owner}
                value={person}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-gray-200 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => navigate(`/userProfile/${person?.owner}`)}
                    >
                      <img
                        src={person?.account?.avatar?.url}
                        alt="avatar"
                        className="h-8 w-8 flex-shrink-0 rounded-full"
                      />
                      <div className="flex flex-col">
                        <span
                          className={classNames(
                            "ml-3 truncate text-black font-medium  ",
                            selected && "font-semibold"
                          )}
                        >
                          {person?.firstName} {person?.lastName}
                        </span>
                        <span
                          className={classNames(
                            "ml-3 truncate text-gray-400 text-xs ",
                            selected && "font-semibold"
                          )}
                        >
                          {person?.account?.username}
                        </span>
                      </div>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
