// @ts-nocheck
import React, { useState } from 'react';
import './index.less';

/**
 * 使用方法
<Tabs>
  <TabItem value="apple" label="Apple">
    This is an apple 🍎
  </TabItem>
  <TabItem value="orange" label="Orange">
    This is an orange 🍊
  </TabItem>
  <TabItem value="banana" label="Banana">
    This is a banana 🍌
  </TabItem>
</Tabs>
*/

const Tabs = (props) => {
  const children = props?.children?.filter(child => child != '\n  ') || [];
  const [activeTab, setActiveTab] = useState(0);

  // 处理Tab切换
  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return <div className='tab-container'>
    <ul className='tab-list'>
      {children.map((tab, index) =>
        <li
          key={tab.props.label}
          className={activeTab === index ? 'tab-item active' : 'tab-item'}
          onClick={() => handleTabChange(index)}
        >
          {tab.props.label}
        </li>)}
    </ul>
    <div className='tab-content'>
      {children[activeTab]?.props?.children}
    </div>
  </div>
}

export default Tabs;
