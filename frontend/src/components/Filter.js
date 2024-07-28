import React, { useContext, useState, useRef, useEffect } from "react";
import "../styles/Filter.css";

function Filter({displayFilters, setDisplayFilters, radioSelected, setRadioSelected}) {

  const [sortBy, setSortBy] = useState({ text: "Sort by" });
 
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [tempSelectedFilters, setTempSelectedFilters] = useState([]);
  // const [displayFilters, setDisplayFilters] = useState([]);
  const [availableFilters, setAvailableFilters] = useState([]);
  const [filterMenues, setFilterMenues] = useState([
    {
      title: "Sort",
      type: "sort",
      list: [
        { title: "Relevance(Default)", value: "relavence" },
        { title: "DeliveryTime", value: "delivery" },
        { title: "Rating", value: "rating" },
        { title: "Cost:LowToHigh", value: "costlowtohigh" },
        { title: "Cost:HighToLow", value: "costhightolow" },
      ],
    },
    {
      title: "Delivery Time",
      type: "deliverytime",
      list: [{ title: "Fast Delivery", value: "fastdelivery", checked: false }],
    },
    {
      title: "Cusines",
      type: "cusines",
      list: [
        // { title: "Bengali", value: "bengali", checked: false },
        // { title: "Bihari", value: "bihari", checked: false },
        { title: "Biriyani", value: "biriyani", checked: false },
        { title: "Burger", value: "burger", checked: false },
        { title: "Cakes & Pasteries", value: "cakes", checked: false },
        { title: "Chinese", value: "chinese", checked: false },
        { title: "Ice Cream", value: "icecream", checked: false },
        { title: "Pizza", value: "pizza", checked: false },
        { title: "South indian", value: "south", checked: false },
        { title: "Rolls", value: "rolls", checked: false },
        { title: "Sandwich", value: "sandwich", checked: false },
      ],
    },
    {
      title: "Explore",
      type: "explore",
      list: [
        // { title: "Bengali", value: "bengali", checked: false },
        // { title: "Bihari", value: "bihari", checked: false },
        { title: "New on quick it", value: "new", checked: false },
      ],
    },
  ]);
  const [selectedFilterMenu, setSelectedFilterMenu] = useState({
    title: "Sort",
    type: "sort",
    list: [
      { title: "Relevance(Default)", value: "relevance" },
      { title: "DeliveryTime", value: "delivery" },
      { title: "Rating", value: "rating" },
      { title: "Cost:LowToHigh", value: "costlowtohigh" },
      { title: "Cost:HighToLow", value: "costhightolow" },
    ],
  });

  const filterList = [
    { type: "sort", name: "Sort" },
    { type: "deliverytime", name: "Fast Delivery" },
    { type: "cusines", name: "Cusines" },
    { type: "explore", name: "Explore" },
  ];
  // const filterMenues = [
  //   {
  //     title: "Sort",
  //     type: "sort",
  //     list: [
  //       { title: "Relevance(Default)", value: "relavence" },
  //       { title: "DeliveryTime", value: "delivery" },
  //       { title: "Rating", value: "rating" },
  //       { title: "Cost:LowToHigh", value: "costlowtohigh" },
  //       { title: "Cost:HighToLow", value: "costhightolow" },
  //     ],
  //   },
  //   {
  //     title: "Delivery Time",
  //     type: "deliverytime",
  //     list: [{ title: "Fast Delivery", value: "delivery", checked: false }],
  //   },
  //   {
  //     title: "Cusines",
  //     type: "cusines",
  //     list: [
  //       // { title: "Bengali", value: "bengali", checked: false },
  //       // { title: "Bihari", value: "bihari", checked: false },
  //       { title: "Biriyani", value: "biriyani", checked: false },
  //       { title: "Burger", value: "burger", checked: false },
  //       { title: "Cakes & Pasteries", value: "cakes", checked: false },
  //       { title: "Chinese", value: "chinese", checked: false },
  //       { title: "Ice Cream", value: "icecream", checked: false },
  //       { title: "Pizza", value: "pizza", checked: false },
  //       { title: "South indian", value: "south", checked: false },
  //       { title: "Rolls", value: "rolls", checked: false },
  //       { title: "Sandwich", value: "sandwich", checked: false },
  //     ],
  //   },
  //   {
  //     title: "Explore",
  //     type: "explore",
  //     list: [
  //       // { title: "Bengali", value: "bengali", checked: false },
  //       // { title: "Bihari", value: "bihari", checked: false },
  //       { title: "New on quick it", value: "new", checked: false },
  //     ],
  //   },
  // ];

  const sortMenuRef = useRef(null);
  const filterMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) {
        setShowSortMenu(false);
      }
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target)
      ) {
        setShowFilterMenu(false);
        setTempSelectedFilters([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    prepareFilters();
  }, [filterMenues]);

  const prepareFilters = () => {
    let tempAvailableFilters = [];
    let tempSelectedFilters = {};
    filterMenues.forEach((item) => {
      item.list.forEach((el) => {
        tempSelectedFilters[el] = false;
      });
      tempAvailableFilters = tempAvailableFilters.concat(item.list);
    });
    // selectedFilters = tempSelectedFilters;
    setAvailableFilters(tempAvailableFilters);

    //console.log("tempAvailableFilters", tempAvailableFilters);
  };

  useEffect(() => {
    updateDisplayFilters();
  },[selectedFilters]);


  const resetSelectedFilterObject = () => {
    let tempOBJ = { ...tempSelectedFilters };
    Object.keys(tempOBJ).forEach((key) => {
      tempOBJ[key] = false;
    });
    setTempSelectedFilters(tempOBJ);
    setSelectedFilters(tempOBJ);
  };
  const handleFilterMenuSelection = (item) => {
    let findObj = filterMenues.find((element) => element.type === item.type);
    //console.log("find obj", findObj);
    if (!findObj) return;

    setSelectedFilterMenu(findObj);
  };

  const handleFilterSelection = (event, filterMenuType) => {
    // console.log(event.target);
    let checked = event.target.checked;
    let type = event.target.name;

    //handle array object
    // let findObj = filterMenues.find(
    //   (element) => element.type === filterMenuType
    // );

    // let findFilterObj = findObj.list.find((element) => element.value === type);
    // findFilterObj.checked = checked;
    // console.log("findFilterObj", findFilterObj);

    // //handle the selected object
    // findFilterObj = selectedFilterMenu.list.find(
    //   (element) => element.value === type
    // );
    // findFilterObj.checked = checked;
    // console.log("findFilterObj", findFilterObj);

    setTempSelectedFilters({
      ...tempSelectedFilters,
      [event.target.name]: event.target.checked,
    });

    //   setSelectedFilters({
    //     ...selectedFilters,
    //     [event.target.name]: event.target.checked
    // });
  };

  const handleClearFilters = () => {
    resetSelectedFilterObject();
    setDisplayFilters([]);
    setShowFilterMenu(false);
  };
  const updateDisplayFilters = () => {

    let tempDisplayFilters = [];

    availableFilters.forEach((el) => {
      if (tempSelectedFilters[el.value] == true) {
        tempDisplayFilters.push(el);
      }
    });

    //console.log("dis", tempDisplayFilters);
    setDisplayFilters([...tempDisplayFilters]);

  }
  const handleApplyFilters = () => {
    setSelectedFilters(tempSelectedFilters);
    //console.log("applied filters",tempSelectedFilters);
    setShowFilterMenu(false);
  };

  const removeFilter = (name) => {
    //console.log("here");
      

      let tempObj = {...tempSelectedFilters};
      tempObj[name] = false;
      setTempSelectedFilters(tempObj);

      setSelectedFilters(tempObj);

  }
  return (
    <>
      {/* filter menu */}
      {showFilterMenu && (
        <div className="filterMenuBg fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            ref={filterMenuRef}
            className="filterMenu rounded-2xl shadow-lg border-2 border-solid p-4 cursor-pointer"
          >
            <div className="p-[8px] border-b-2 font-bold text-gray-700 text-[25px]">
              Filter
            </div>
            {/* left side */}
            <div className="flex h-[72%]">
              <div className="w-[40%] border-r-2 h-full overflow-y-auto">
                {filterList.map((item) => (
                  <div
                    className={`text-[20px] font-semibold p-[5px]  ${
                      item.type === selectedFilterMenu.type
                        ? "text-white bg-customHoverColor"
                        : "text-gray-700"
                    }`}
                    onClick={(e) => {
                      handleFilterMenuSelection(item);
                    }}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
              {/* right side */}
              <div className="w-[60%]  overflow-y-auto">
                <div className="space-y-4 pl-[20px] pt-[20px]">
                  {selectedFilterMenu.type == "sort"
                    ? selectedFilterMenu.list.map((item) => (
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={item.value}
                            name="sort"
                            value={item.value}
                            checked={radioSelected === item.value}
                            onChange={(e) => {
                              setRadioSelected(e.target.value);
                              //console.log(e.target.value);
                            }}
                          ></input>
                          <label for="html">{item.title}</label>
                        </div>
                      ))
                    : selectedFilterMenu.list.map((item) => (
                        <div className="">
                          <input
                            type="checkbox"
                            id={item.value}
                            name={item.value}
                            checked={tempSelectedFilters[item.value] || false}
                            onChange={(e) => {
                              handleFilterSelection(e, selectedFilterMenu.type);
                            }}
                          ></input>
                          <label for="vehicle1"> {item.title}</label>
                          <br></br>
                        </div>
                      ))}
                </div>
              </div>
            </div>
            <div className="p-[8px] font-bold text-gray-700 text-[25px] float-right">
              <button
                type="button"
                class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                onClick={handleClearFilters}
              >
                Clear Filters
              </button>
              <button
                type="button"
                class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                onClick={handleApplyFilters}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* filter menu */}

      <div className="mt-[20px] flex space-x-2 font-medium">
        {/* filter */}
        <div
          onClick={() => {
            setShowFilterMenu(true);
            //console.log("selected filter menu", selectedFilterMenu);
          }}
          className="inline-block w-[130px] h-[45px] border-2 border-solid border-customHoverColor rounded-full shadow-lg text-center pt-2 text-[14px] flex cursor-pointer"
        >
          {displayFilters.length?  <div className="rounded-full bg-customHoverColor w-[20px] h-[20px] inline-block mr-2 ml-3 mt-[1px] text-white">
            {displayFilters.length}
          </div>:<div className=" w-[20px] h-[20px] inline-block mr-2 ml-3 mt-[1px] text-white">
            
          </div> }
         
          Filter
          <div className="ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
          </div>
        </div>
        {/* filter */}

        {/* <div className="inline-block w-[130px] h-[45px] border-2 border-solid border-customHoverColor rounded-full shadow-lg text-center pt-2 text-[14px]  cursor-pointer">
      
     
      Filter
      
    </div> */}
        {/* sort by */}
        <div
          className="inline-block w-[100px] h-[45px] border-2 border-solid border-customHoverColor rounded-full shadow-lg text-center pt-2 pl-5 text-[14px] flex cursor-pointer"
          onClick={() => setShowSortMenu(true)}
        >
          {sortBy.text}
          <div className="ml-1 pt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 34 34"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
          {/* menu */}
          {showSortMenu && (
            <div
              ref={sortMenuRef}
              className="menu rounded-2xl shadow-lg border-2 border-solid p-4 z-30"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="relevence"
                    name="sort"
                    value="relevance"
                    checked={radioSelected === "relevance"}
                    onChange={(e) => {
                      setRadioSelected(e.target.value);
                      //console.log(e.target.value);
                    }}
                  ></input>
                  <label for="html">Relevance</label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="delivery"
                    name="sort"
                    value="delivery"
                    checked={radioSelected === "delivery"}
                    onChange={(e) => {
                      setRadioSelected(e.target.value);
                      //console.log(e.target.value);
                    }}
                  ></input>
                  <label for="html">Delivery time</label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="rating"
                    name="sort"
                    value="rating"
                    checked={radioSelected === "rating"}
                    onChange={(e) => {
                      setRadioSelected(e.target.value);
                     // console.log(e.target.value);
                    }}
                  ></input>
                  <label for="html">Ratings</label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="costlowtohigh"
                    name="sort"
                    value="costlowtohigh"
                    checked={radioSelected === "costlowtohigh"}
                    onChange={(e) => {
                      setRadioSelected(e.target.value);
                      //console.log(e.target.value);
                    }}
                  ></input>
                  <label for="html">Cost:LowToHigh</label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="costhightolow"
                    name="sort"
                    value="costhightolow"
                    checked={radioSelected === "costhightolow"}
                    onChange={(e) => {
                      setRadioSelected(e.target.value);
                      //console.log(e.target.value);
                    }}
                  ></input>
                  <label for="html">Cost:HighToLow</label>
                </div>
              </div>
            </div>
          )}

          {/* menu */}
        </div>
        {/* sort by */}

        {/* filter chips */}

        {displayFilters.map((item) => (
          <div
            className="inline-block min-w-[100px] w-auto h-[45px] border-2 border-solid rounded-full shadow-lg text-center pt-2 pl-5 text-[14px] flex cursor-pointer"
            
          >
            {item.title}
            <div className="ml-1 pt-1" onClick={() => removeFilter(item.value)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 34 34"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        ))}

        {/* filter chips */}
      </div>
    </>
  );
}

export default Filter;
