import React,{useState} from "react";
import {FILTER_COMPARE_OPTIONS, Filter_Search_Types} from "../constants/taskConstants";
import OperatorFilterDropDown from "./OperatorFilterDropdown";

const TaskFilterSearch = ({filterSelections = [], deleteSearchFilter, updateSearchFilterData}) => {

  let [valueBoxIndex,setShowValueBoxIndex]=useState(null);
  let [lhsValueBoxIndex,setShowLHSValueBoxIndex]=useState(null);


  const handleKeyDownRHS = (e,index) => {
    if (e.key === 'Enter') {
      setShowValueBoxIndex(null)
      console.log(e.target.value);
      updateSearchFilterData(e.target.value,index);
      console.log('we need to hide the text box and show the content rhs');
    }
  };
  const handleKeyDownLHS = (e) => {
    if (e.key === 'Enter') {
      setShowLHSValueBoxIndex(null)
      console.log('we need to hide the text box and show the content lhs');
    }
  };
  return (
    <>
      {filterSelections.map((filter, index) => (
        <div key={index}>
          <div className="filter-details" key={index}>
            <div className="close-container  click-element" onClick={()=>deleteSearchFilter(filter,index)}>
              <span className="close-btn">
              <i className="fa fa-times" aria-hidden="true"/>
             </span>
            </div>
            <div className="box-container">
              {filter.label}
              <span>
            <span className="btn-container">
              {filter.type===Filter_Search_Types.VARIABLES?<>
                <button className="btn">
                  <i className="fa fa-check" aria-hidden="true"/>
                </button>
                <button className="btn">
                  <i className="fa fa-times" aria-hidden="true"/>
                </button>
                </>:null
              }
            </span>
                {filter.type===Filter_Search_Types.VARIABLES?lhsValueBoxIndex!==index?<input onKeyDown={handleKeyDownLHS} type="text"/>:'':""}
            <span className="condition-container">
            <span className="btn-container second-box">
        {filter.type===Filter_Search_Types.VARIABLES?<button className="btn">
              <i className="fa fa-calendar" aria-hidden="true"/>
            </button>:null}
            <button className="btn">
              <i className="fa fa-check" aria-hidden="true"/>
            </button>
            <button className="btn">
              <i className="fa fa-times" aria-hidden="true"/>
            </button></span>
            <span>  <OperatorFilterDropDown compareOptions={FILTER_COMPARE_OPTIONS[filter.type]} /> </span>
              {/* <span>like</span>
            <span>in</span>*/}
              {filter.value||valueBoxIndex===index?null:<span className="click-element" onClick={()=>setShowValueBoxIndex(index)}>{valueBoxIndex===index?filter.value:'??'}</span>}
              <span>
              {valueBoxIndex===index ?<input
                  type="text"
                  className="filters"
                  placeholder=""
                  value={filter.value}
                  onKeyDown={(e)=>handleKeyDownRHS(e,index)}
                  onBlur={() => setShowValueBoxIndex(null)}
                />:filter.value?<span className="click-element" onClick={()=>setShowValueBoxIndex(index)}>{filter.value}</span>:null}
              </span>
             </span>
             </span>
            </div>
          </div>
        </div>
      ))}
    </>)

};

export default TaskFilterSearch;

