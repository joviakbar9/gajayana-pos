function Items() {
    const [itemsData, setItemsData] = useState([]);
    const [addEditModalVisibilty, setAddEditModalVisibilty] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const dispatch = useDispatch();
    const getAllItems = () => {
      dispatch({ type: "showLoading" });
      axios
        .get(`${BASE_URL}/api/items/get-all-items`)
        .then((response) => {
          dispatch({ type: "hideLoading" });
          setItemsData(response.data);
        })
        .catch((error) => {
          dispatch({ type: "hideLoading" });
          console.log(error);
        });
    };
  
    const deleteItem = (record) => {
      dispatch({ type: "showLoading" });
      axios
        .post(`${BASE_URL}/api/items/delete-item` , {itemId : record._id})
        .then((response) => {
          dispatch({ type: "hideLoading" });
          message.success('Produk berhasil dihapus')
          getAllItems()
        })
        .catch((error) => {
          dispatch({ type: "hideLoading" });
          message.error('Terjadi Kesalahan')
          console.log(error);
        });
    };

    useEffect(() => {
        getAllItems();
      }, []);
    
      const onFinish = (values) => {
        dispatch({ type: "showLoading" });
        if(editingItem===null)
        {
          axios
          .post(`${BASE_URL}/api/items/add-item`, values)
          .then((response) => {
            dispatch({ type: "hideLoading" });
            message.success("Produk berhasil ditambah");
            setAddEditModalVisibilty(false);
            getAllItems();
          })
          .catch((error) => {
            dispatch({ type: "hideLoading" });
            message.error("Terjadi Kesalahan");
            console.log(error);
          });
        }
        else{
          axios
          .post(`${BASE_URL}/api/items/edit-item`, {...values , itemId : editingItem._id})
          .then((response) => {
            dispatch({ type: "hideLoading" });
            message.success("Data produk berhasil diubah");
            setEditingItem(null)
            setAddEditModalVisibilty(false);
            getAllItems();
          })
          .catch((error) => {
            dispatch({ type: "hideLoading" });
            message.error("Terjadi Kesalahan");
            console.log(error);
          });
        }
      };