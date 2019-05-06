import React, { useState, useCallback } from 'react';
/**
 * 弹窗自定义 hook
 * @param {Object} init   创建 hook 时给定一个 data 的初始值
 * - data         弹窗数据： 在打开弹窗时可以将部分有用数据存储在该状态中（至于data的数据结构如何完全由用户自定义）
 * - isOpen       弹窗是否开启， 弹窗状态控制弹窗的开启和关闭
 * - openEvents   打开弹窗事件列表， 在打开弹窗时将会依次执行列表中的所有事件函数
 * - closeEvents  关闭弹窗事件列表， 在关闭弹窗时将会依次执行列表中的所有事件函数
 */
export const useModal = (init = {}) => {
  const [data, setData] = useState(init);
  const [isOpen, setIsOpen] = useState(false);
  const [openEvents, setOpenEvents] = useState([]);
  const [closeEvents, setCloseEvents ] = useState([]);

  /**
   * 打开弹窗
   * @param {Object} data 打开弹窗时要存储的数据
   */
  const openModal = useCallback((data) => {
    setIsOpen(true);
    setData({...init, ...data});
    openEvents.forEach(v => v({...init, ...data}));
  }, []);

  /**
   * 关闭弹窗
   */
  const closeModal = useCallback(() => {
    closeEvents.forEach(v => v(data));
    setIsOpen(false);
    setData(init);
  }, []);

  /**
   * 添加打开弹窗事件
   * @param {Function} cb 打开弹窗事件函数
   */
  const onOpen = useCallback((cb) => {
    setOpenEvents([...openEvents, cb]);
  }, [openEvents]);

  /**
   * 添加关闭弹窗事件
   * @param {Function} cb 关闭弹窗事件函数
   */
  const onClose = useCallback((cb) => {
    setCloseEvents([...closeEvents, cb]);
  }, [closeEvents]);

  return {
    data,
    isOpen,
    onOpen,
    onClose,
    openModal,
    closeModal
  };
}
