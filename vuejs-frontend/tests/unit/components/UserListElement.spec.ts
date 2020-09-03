import { shallowMount, createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import Buefy from "buefy";
import UserListElement from "@/components/UserListElement.vue";
import { User } from "@/models/User";
import LoadingIcon from "@/components/LoadingIcon.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Buefy);

describe(UserListElement.name + " component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully.", () => {
    const user: User = { id: "1", name: "Test" };
    const state = {
      users: [user],
      fetchUsersIsLoading: false,
      fetchUsersHasError: false,
      addUserIsLoading: false,
      addUserHasError: false,
      deleteUserIsLoading: [],
      deleteUserHasError: [],
      deleteUserErrorMsg: {}
    };
    const actions = {
      deleteUser: jest.fn()
    };
    const store = new Vuex.Store({
      state,
      actions
    });

    const wrapper = shallowMount(UserListElement, {
      store,
      localVue,
      propsData: { user }
    });

    expect(wrapper.text()).toMatch("Test");
    expect(wrapper).toMatchSnapshot();
  });

  it("should click delete button and call respective dispatch.", async () => {
    const user: User = { id: "1", name: "user1" };
    const state = {
      users: [user],
      fetchUsersIsLoading: false,
      fetchUsersHasError: false,
      addUserIsLoading: false,
      addUserHasError: false,
      deleteUserIsLoading: [],
      deleteUserHasError: [],
      deleteUserErrorMsg: {}
    };
    const actions = {
      deleteUser: jest.fn()
    };
    const store = new Vuex.Store({
      state,
      actions
    });

    const wrapper = mount(UserListElement, {
      store,
      localVue,
      propsData: { user }
    });

    await wrapper.findComponent({ name: "BButton" }).trigger("click");

    expect(actions.deleteUser.mock.calls[0][1]).toEqual("1");
    expect(wrapper.findComponent({ name: "BButton" }).exists()).toBeTruthy();
    expect(wrapper.find(".error").exists()).toBeFalsy();
    expect(wrapper.find(".loading").exists()).toBeFalsy();
    expect(wrapper.findComponent(LoadingIcon).exists()).toBeFalsy();
    expect(wrapper).toMatchSnapshot();
  });

  it("should display loading icon if id is in deleteUserIsLoading.", async () => {
    const user: User = { id: "1", name: "user1" };
    const state = {
      users: [user],
      fetchUsersIsLoading: false,
      fetchUsersHasError: false,
      addUserIsLoading: false,
      addUserHasError: false,
      deleteUserIsLoading: ["1"],
      deleteUserHasError: [],
      deleteUserErrorMsg: {}
    };
    const actions = {
      deleteUser: jest.fn()
    };
    const store = new Vuex.Store({
      state,
      actions
    });

    const wrapper = shallowMount(UserListElement, {
      store,
      localVue,
      propsData: { user }
    });

    expect(wrapper.find(".error").exists()).toBeFalsy();
    expect(wrapper.find(".loading").exists()).toBeTruthy();
    expect(wrapper.findComponent(LoadingIcon).exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  it("should display error icon if id is in deleteUserHasError.", async () => {
    const user: User = { id: "1", name: "user1" };
    const state = {
      users: [user],
      fetchUsersIsLoading: false,
      fetchUsersHasError: false,
      addUserIsLoading: false,
      addUserHasError: false,
      deleteUserIsLoading: [],
      deleteUserHasError: ["1"],
      deleteUserErrorMsg: { "1": "xyz" }
    };
    const actions = {
      deleteUser: jest.fn()
    };
    const store = new Vuex.Store({
      state,
      actions
    });

    const wrapper = shallowMount(UserListElement, {
      store,
      localVue,
      propsData: { user }
    });

    expect(wrapper.find(".error").exists()).toBeTruthy();
    expect(wrapper.find(".error").text()).toEqual("Unable to delete user: xyz");
    expect(wrapper.find(".loading").exists()).toBeFalsy();
    expect(wrapper.findComponent(LoadingIcon).exists()).toBeFalsy();
    expect(wrapper).toMatchSnapshot();
  });
});
