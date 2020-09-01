import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import MainPage from "@/components/MainPage.vue";
import UserList from "@/components/UserList.vue";
import LoadingIcon from "@/components/LoadingIcon.vue";
import AddUser from "@/components/AddUser.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe(MainPage.name + " component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render and match snapshot given isLoading=true.", () => {
    const state = {
      users: [],
      fetchUsersIsLoading: true,
      fetchUsersHasError: false,
      addUserIsLoading: false,
      addUserHasError: false
    };
    const actions = {
      fetchUsers: jest.fn()
    };

    const store = new Vuex.Store({
      state,
      actions
    });

    const wrapper = shallowMount(MainPage, { store, localVue });

    expect(wrapper.find(".error").exists()).toBeFalsy();
    expect(wrapper.find(".loading").exists()).toBeTruthy();
    expect(wrapper.findComponent(LoadingIcon).exists()).toBeTruthy();
    expect(wrapper.find(".user-list").exists()).toBeFalsy();
    expect(actions.fetchUsers).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });

  it("should render and match snapshot given isError=true.", () => {
    const state = {
      users: [],
      fetchUsersIsLoading: false,
      fetchUsersHasError: true,
      addUserIsLoading: false,
      addUserHasError: false,
      fetchUsersErrorMsg: "test"
    };
    const actions = {
      fetchUsers: jest.fn()
    };

    const store = new Vuex.Store({
      state,
      actions
    });

    const wrapper = shallowMount(MainPage, { store, localVue });
    expect(wrapper.find(".error").exists()).toBeTruthy();
    expect(wrapper.find(".error").text()).toEqual("Unable to load users: test");
    expect(wrapper.find(".loading").exists()).toBeFalsy();
    expect(wrapper.findComponent(LoadingIcon).exists()).toBeFalsy();
    expect(wrapper.find(".user-list").exists()).toBeFalsy();
    expect(actions.fetchUsers).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });

  it("should render and match snapshot given isError=false and isLoading=false.", () => {
    const state = {
      users: [{ name: "user1" }],
      fetchUsersIsLoading: false,
      fetchUsersHasError: false,
      addUserIsLoading: false,
      addUserHasError: false
    };
    const actions = {
      fetchUsers: jest.fn()
    };

    const store = new Vuex.Store({
      state,
      actions
    });

    const wrapper = shallowMount(MainPage, { store, localVue });
    expect(wrapper.find(".error").exists()).toBeFalsy();
    expect(wrapper.find(".loading").exists()).toBeFalsy();
    expect(wrapper.findComponent(LoadingIcon).exists()).toBeFalsy();
    expect(wrapper.find(".user-list").exists()).toBeTruthy();
    expect(wrapper.findAllComponents(UserList).exists()).toBeTruthy();
    expect(wrapper.findAllComponents(AddUser).exists()).toBeTruthy();
    expect(actions.fetchUsers).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
