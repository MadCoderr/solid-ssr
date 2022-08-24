import { Component, For } from 'solid-js';
import { createStore } from 'solid-js/store';
import { autoAnimate } from 'solid-auto-animate';

interface Item {
  id: number;
  title: string;
}

const App: Component = () => {
  autoAnimate;

  let inputRef: any;
  const [items, setItems] = createStore<Item[]>([]);

  const addNewItem = () => {
    if (inputRef.value !== '') {
      setItems([
        ...items,
        {
          id: Math.random(),
          title: inputRef.value,
        },
      ]);

      inputRef.value = '';
    } else {
      alert('Please enter something');
    }
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div class="root">
      <div class="input-wrapper">
        <input
          type="text"
          placeholder="Enter Sentence"
          class="input"
          ref={inputRef}
        />
      </div>
      <button class="add-btn" onClick={addNewItem}>
        Add item
      </button>

      <ul class="list" use:autoAnimate>
        <For each={items}>
          {(item: Item) => {
            const { id, title } = item;
            return (
              <li>
                <span class="label">{title}</span>
                <span class="delete-btn" onClick={() => removeItem(id)}>
                  X
                </span>
              </li>
            );
          }}
        </For>
      </ul>
    </div>
  );
};

export default App;
