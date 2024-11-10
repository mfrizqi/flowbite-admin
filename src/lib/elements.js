const url = 'https://673032d166e42ceaf15fa407.mockapi.io/chemicallist';
let config = {
  headers:{},
  method: 'GET',
  'content-type':'application/json'
};

export const get = async() => {
  config.method = 'GET'
	const res = await fetch(url, config);
  console.log(res);
	return res.json();
}

export const remove = async(id) => {
  config.method = 'DELETE'
	const res = await fetch(url+`/${id}`, config);
	return res;
}

export const add = async (item)=>{
  config.method="POST"
  config.body = JSON.stringify(item);
  const res = await fetch(url, config);
  return res
}

export const edit = async (item, id)=>{
  config.method="PUT"
  config.body = JSON.stringify(item);
  const res = await fetch(url+ `/${id}`, config);
  return res
}
