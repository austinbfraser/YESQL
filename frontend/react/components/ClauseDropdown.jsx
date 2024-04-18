import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addClauseOrCondition, removeInputWindow } from '../../querySlice'
import menuData from '../dropdownData';
import dropdownIcon from '../../assets/dropdown_icon.png';

// We're utilizing the ClauseDropdown for selecting the variation of clauses available to build our Query. 
// There are additional clauses we'd need to add.  
const ClauseDropdown = () => {
  const dispatch = useDispatch();
  // The handleChange function is being invoked once we select a clause in the dropdown
  const handleChange = (event) => {
    // dispatching our addClauseOrCondition action to the querySlice.js
    dispatch(addClauseOrCondition(event.target.value));
  }


  const toggleSubMenu = (e, value) => {
    e.stopPropagation();
    let submenu = e.target.querySelector('ul');
    console.log(e.target.value, 'e target value')
    if (!submenu) {
      dispatch(addClauseOrCondition(value));
      document.querySelector('.nestedMenu').style.display = 'none';
      return
    };
    if (submenu.style.display === 'none' || !submenu.style.display){
      submenu.style.display = 'inline-block';
      
    } else {
      submenu.style.display = 'none';
    }
  }

  const renderSubMenu = (subMenu) => {
    return (
      <ul className="submenu"> 
        {subMenu.map((subItem, index) => (
          <li key={index} onClick={(e) => toggleSubMenu(e, subItem.label)}>
            {subItem.label}
            {subItem.submenu && renderSubMenu(subItem.submenu)}
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
      <div className="queryBuilder" onClick={toggleSubMenu} onChange={handleChange}> +
        <ul className="nestedMenu">
          {menuData.map((item, index) => (
            <li value={item.label} key={index} className={item.top ? 'top10' : ''} onClick={(e) => toggleSubMenu(e, item.label)}>
              {item.label}
              {item.submenu && <img className={'dropdownIcon'} src={dropdownIcon}/>}
              {item.submenu && renderSubMenu(item.submenu)}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default ClauseDropdown;