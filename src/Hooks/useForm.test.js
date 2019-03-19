import { renderHook, cleanup, act } from 'react-hooks-testing-library';
import useForm from './useForm';

afterEach(cleanup);

describe('useForm Hook', () => {
  it('Should return a form with fields values', () => {
    const { result } = renderHook(() => useForm());
    

    act(() => result.current.handleChange({
      persist: () => {},
      target: {
        name: 'input',
        value: 'value'
      }
    }));

    expect(result.current.values['input']).toEqual('value');
  });
});
