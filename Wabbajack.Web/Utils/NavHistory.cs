using System.Collections.Generic;
using System.Linq;

namespace Wabbajack.Web.Utils;

public class NavHistory<T>
{
    private readonly LinkedList<T> _items = new LinkedList<T>();
    public List<T> Items => _items.ToList();
    public int Capacity { get;}
    public NavHistory(int capacity)
    {
        Capacity = capacity;
    }

    public void Push(T item)
    {
        // full
        if (_items.Count == Capacity)
        {
            // we should remove first, because some times, if we exceeded the size of the internal array
            // the system will allocate new array.
            _items.RemoveFirst();
            _items.AddLast(item);
        }
        else
        {
            _items.AddLast(new LinkedListNode<T>(item));
        }
    }

    public T Pop()
    {
        if (_items.Count == 0)
        {
            return default;
        }
        var ls = _items.Last;
        _items.RemoveLast();
        return ls == null ? default : ls.Value;
    }
}
