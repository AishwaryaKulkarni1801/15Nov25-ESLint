import { DemoComponent } from './demo.component';

// Factory helper (direct instantiation pattern)
const createSUT = () => new DemoComponent();

describe('DemoComponent (unit, direct instantiation)', () => {
  let comp: DemoComponent;

  beforeEach(() => {
    comp = createSUT();
  });

  it('should create the component and have default values', () => {
    expect(comp).toBeTruthy();
    expect(comp.title).toBe('Demo Component');
    expect(comp.message).toBe('Welcome to the demo section!');
    expect(comp.counter).toBe(0);
    expect(Array.isArray(comp.items)).toBe(true);
    expect(comp.items.length).toBe(3);
    expect(comp.newItem).toBe('');
    expect(comp.showDetails).toBe(false);
    // access private unusedPrivateVar via any cast to ensure it's defined
    // tslint:disable-next-line: no-any
    const anyComp: any = comp as any;
    expect(anyComp.unusedPrivateVar).toBe('unused');
  });

  it('should increment the counter when increment is called', () => {
    comp.increment();
    expect(comp.counter).toBe(1);
  });

  it('should decrement the counter when decrement is called', () => {
    comp.counter = 2;
    comp.decrement();
    expect(comp.counter).toBe(1);
  });

  it('should reset the counter when reset is called', () => {
    comp.counter = 5;
    comp.reset();
    expect(comp.counter).toBe(0);
  });

  it('should add a trimmed new item when newItem has content and reset newItem', () => {
    const initialLen = comp.items.length;
    comp.newItem = '  New Item  ';
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    try {
      comp.addItem();
      expect(comp.items.length).toBe(initialLen + 1);
      expect(comp.items[comp.items.length - 1]).toBe('New Item');
      expect(comp.newItem).toBe('');
      // addItem logs 4 times
      expect(spy).toHaveBeenCalledTimes(4);
    } finally {
      spy.mockRestore();
    }
  });

  it('should not add an item when newItem is empty or whitespace, but still log', () => {
    const initialLen = comp.items.length;
    comp.newItem = '    ';
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    try {
      comp.addItem();
      expect(comp.items.length).toBe(initialLen);
      // newItem should remain whitespace (component doesn't clear when trimmed empty)
      expect(comp.newItem).toBe('    ');
      expect(spy).toHaveBeenCalledTimes(4);
    } finally {
      spy.mockRestore();
    }
  });

  it('should remove an item at given index and log', () => {
    comp.items = ['A', 'B', 'C'];
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    try {
      comp.removeItem(1);
      expect(comp.items).toEqual(['A', 'C']);
      expect(spy).toHaveBeenCalledTimes(4);
    } finally {
      spy.mockRestore();
    }
  });

  it('removeItem with out-of-range index should not change items but still log', () => {
    comp.items = ['X', 'Y'];
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    try {
      comp.removeItem(10);
      expect(comp.items).toEqual(['X', 'Y']);
      expect(spy).toHaveBeenCalledTimes(4);
    } finally {
      spy.mockRestore();
    }
  });

  it('toggleDetails should toggle the showDetails flag and log each time', () => {
    expect(comp.showDetails).toBe(false);
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    try {
      comp.toggleDetails();
      expect(comp.showDetails).toBe(true);
      expect(spy).toHaveBeenCalledTimes(4);
      comp.toggleDetails();
      expect(comp.showDetails).toBe(false);
      expect(spy).toHaveBeenCalledTimes(8);
    } finally {
      spy.mockRestore();
    }
  });

  it('getCurrentTime should return the current time string (mocked)', () => {
    const mockTime = '12:34:56';
    const spy = jest.spyOn(Date.prototype, 'toLocaleTimeString').mockReturnValue(mockTime);
    try {
      const t = comp.getCurrentTime();
      expect(t).toBe(mockTime);
    } finally {
      spy.mockRestore();
    }
  });
});

