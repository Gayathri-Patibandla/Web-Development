const todoList = () => {
    const all = [];
  
    const add = (todoItem) => {
      all.push(todoItem);
    };
  
    const markAsComplete = (index) => {
      all[index].completed = true;
    };
  
    const overdue = () => {
      const today = new Date();
      return all.filter((item) => new Date(item.dueDate).setHours(0,0,0,0) < today.setHours(0,0,0,0) && !item.completed);
    };
  
    const dueToday = () => {
      const today = new Date();
      return all.filter((item) => new Date(item.dueDate).toDateString() === today.toDateString());
    };
  
    const dueLater = () => {
      const today = new Date();
      return all.filter(
        (item) => new Date(item.dueDate) > today && new Date(item.dueDate).toDateString() !== today.toDateString()
      );
    };
  
    const toDisplayablelist = (list) => {
      return list
        .map((item) => `[${item.completed ? 'x' : ' '}] ${item.title} ${formattedDate(item.dueDate)}`)
        .join('\n');
    };
  
    const formattedDate = (dateString) => {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    };
  
    return {
      all,
      add,
      markAsComplete,
      overdue,
      dueToday,
      dueLater,
      toDisplayablelist,
    };
  };
 
  module.exports = todoList;