import { AppComponent } from './app.component';

// Helper factory following established patterns: createSUT (system under test)
const createSUT = () => new AppComponent();

describe('AppComponent (unit, no TestBed)', () => {
  let component: AppComponent;

  beforeEach(() => {
    component = createSUT();
  });

  it('should create the component instance', () => {
    expect(component).toBeTruthy();
  });

  it("should have default title 'Angular Demo App'", () => {
    expect(component.title).toBe('Angular Demo App');
  });

  it('should allow title to be changed', () => {
    component.title = 'New Title';
    expect(component.title).toBe('New Title');
  });

  it('should expose the private unusedProperty via any cast and allow mutation', () => {
    // tslint:disable-next-line: no-any
    const anyComp: any = component as any;
    expect(anyComp.unusedProperty).toBe('not used anywhere');
    anyComp.unusedProperty = 'now used';
    expect(anyComp.unusedProperty).toBe('now used');
  });

  it('should call console.log("Method called") when someMethod is invoked', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    try {
      component.someMethod();
      expect(spy).toHaveBeenCalledWith('Method called');
    } finally {
      spy.mockRestore();
    }
  });

  it('should not expose function-scoped variables after calling someMethod', () => {
    // var inside method should not be attached to the instance
    component.someMethod();
    // tslint:disable-next-line: no-any
    const anyComp: any = component as any;
    expect(anyComp.oldStyleVar).toBeUndefined();
  });

  it('getAngularVersion should return a valid Angular version string', () => {
    expect(component.getAngularVersion()).toBe('16.x');
  });

  it('calling someMethod multiple times should consistently call console.log', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    try {
      component.someMethod();
      component.someMethod();
      expect(spy).toHaveBeenCalledTimes(2);
    } finally {
      spy.mockRestore();
    }
  });
});

