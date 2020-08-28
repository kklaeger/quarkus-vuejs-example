import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import UserList from "@/components/UserList.vue";
import UserListElement from "@/components/UserListElement.vue";
import LoadingIcon from "@/components/LoadingIcon.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe(UserList.name + " component", () => {
  it("should render and match snapshot given isLoading=true.", () => {
    const state = {
      isLoading: true,
      isError: false
    };
    const actions = {
      fetchUsers: jest.fn()
    };

    const store = new Vuex.Store({
      state,
      actions
    });

    const wrapper = shallowMount(UserList, { store, localVue });

    expect(wrapper.find(".error").exists()).toBeFalsy();
    expect(wrapper.find(".loading").exists()).toBeTruthy();
    expect(wrapper.findComponent(LoadingIcon).exists()).toBeTruthy();
    expect(wrapper.find(".user-list").exists()).toBeFalsy();
    expect(actions.fetchUsers).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });

  it("should render and match snapshot given isError=true.", () => {
    const state = {
      isLoading: false,
      isError: true,
      error: "test"
    };
    const actions = {
      fetchUsers: jest.fn()
    };

    const store = new Vuex.Store({
      state,
      actions
    });

    const wrapper = shallowMount(UserList, { store, localVue });
    expect(wrapper.find(".error").exists()).toBeTruthy();
    expect(wrapper.find(".error").text()).toEqual("Unable to load users: test");
    expect(wrapper.find(".loading").exists()).toBeFalsy();
    expect(wrapper.findComponent(LoadingIcon).exists()).toBeFalsy();
    expect(wrapper.find(".user-list").exists()).toBeFalsy();
    expect(actions.fetchUsers).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the user list for empty user list and match snapshot.", () => {
    const state = {
      users: [],
      isLoading: false,
      isError: false,
      error: ""
    };
    const actions = {
      fetchUsers: jest.fn()
    };

    const store = new Vuex.Store({
      state,
      actions
    });

    const wrapper = shallowMount(UserList, { store, localVue });
    expect(wrapper.find(".error").exists()).toBeFalsy();
    expect(wrapper.find(".loading").exists()).toBeFalsy();
    expect(wrapper.findComponent(LoadingIcon).exists()).toBeFalsy();
    expect(wrapper.find(".user-list").exists()).toBeTruthy();
    expect(wrapper.find(".user-list").text()).toEqual("No users available :)");
    expect(actions.fetchUsers).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the user list for one user and match snapshot.", () => {
    const state = {
      users: [{ name: "user1" }],
      isLoading: false,
      isError: false,
      error: ""
    };
    const actions = {
      fetchUsers: jest.fn()
    };

    const store = new Vuex.Store({
      state,
      actions
    });

    const wrapper = shallowMount(UserList, { store, localVue });
    expect(wrapper.find(".error").exists()).toBeFalsy();
    expect(wrapper.find(".loading").exists()).toBeFalsy();
    expect(wrapper.findComponent(LoadingIcon).exists()).toBeFalsy();
    expect(wrapper.find(".user-list").exists()).toBeTruthy();
    expect(wrapper.findAllComponents(UserListElement)).toHaveLength(1);
    expect(
      wrapper
        .findAllComponents(UserListElement)
        .at(0)
        .props().user
    ).toEqual({ name: "user1" });
    expect(actions.fetchUsers).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the user list for two users and match snapshot.", () => {
    const state = {
      users: [{ name: "user1" }, { name: "user2" }],
      isLoading: false,
      isError: false,
      error: ""
    };
    const actions = {
      fetchUsers: jest.fn()
    };

    const store = new Vuex.Store({
      state,
      actions
    });

    const wrapper = shallowMount(UserList, { store, localVue });
    expect(wrapper.find(".error").exists()).toBeFalsy();
    expect(wrapper.find(".loading").exists()).toBeFalsy();
    expect(wrapper.findComponent(LoadingIcon).exists()).toBeFalsy();
    expect(wrapper.find(".user-list").exists()).toBeTruthy();
    expect(wrapper.findAllComponents(UserListElement)).toHaveLength(2);
    expect(
      wrapper
        .findAllComponents(UserListElement)
        .at(0)
        .props().user
    ).toEqual({ name: "user1" });
    expect(
      wrapper
        .findAllComponents(UserListElement)
        .at(1)
        .props().user
    ).toEqual({ name: "user2" });
    expect(actions.fetchUsers).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });
});
