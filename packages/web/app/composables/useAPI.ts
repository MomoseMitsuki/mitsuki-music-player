const config = useRuntimeConfig();

export const useAPI = createUseFetch({
	baseURL: config.backendOrigin as string,
	headers: {
		cookie: useRequestHeader("cookie") || ""
	}
});
