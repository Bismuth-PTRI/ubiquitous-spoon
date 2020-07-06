import 'regenerator-runtime/runtime';

export const identifyPreferences = (glbItems, usrSelection) => {
  return usrSelection.map((u) => Object.values(glbItems).filter((glb) => u === glb.value)[0].id);
};

export const loadPreferences = async (type) => {
  const apiCall = async () => {
    return await fetch(`/api/preference/?type=${type}`)
      .then((res) => res.json())
      .then((resData) => resData)
      .catch((err) => {
        return { status: 'error', message: err };
      });
  };
  const loadpreferences = await apiCall(type);
  return loadpreferences;
};

export const signupUserApi = async (uObj, pObj) => {
  const apiCall = async () => {
    return await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...uObj, preference: pObj }),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.err === 'Username already exists') {
          return { status: 'failed', message: resData.err };
        } else if (resData.success) {
          return { status: 'success', message: 'User created' };
        }
      })
      .catch((err) => {
        console.log('User Signup Error :: ', err);
        return { status: 'error', message: err };
      });
  };
  const signupresp = await apiCall(uObj, pObj);
  return signupresp;
};
