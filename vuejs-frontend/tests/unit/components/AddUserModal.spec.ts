import { Vue } from "vue-property-decorator";
import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Buefy from "buefy";
import AddUserModal from "@/components/AddUserModal.vue";
import LoadingIcon from "@/components/LoadingIcon.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Buefy);

describe(AddUserModal.name + " component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should trigger emit('close') by clicking close button.", async () => {
    const state = {
      users: [],
      fetchUsersIsLoading: false,
      fetchUsersHasError: false,
      addUserIsLoading: false,
      addUserHasError: false,
      deleteUserIsLoading: false,
      deleteUserHasError: false
    };
    const actions = {
      addUser: jest.fn()
    };

    const store = new Vuex.Store({
      state,
      actions
    });

    const wrapper = mount(AddUserModal, { store, localVue });

    wrapper
      .findAll("button")
      .at(0)
      .trigger("click");

    expect(wrapper.emitted().close).toBeTruthy();
    expect(wrapper.find(".error").exists()).toBeFalsy();
    expect(wrapper.find(".loading").exists()).toBeFalsy();
    expect(wrapper.findComponent(LoadingIcon).exists()).toBeFalsy();
    expect(wrapper).toMatchSnapshot();
  });

  it("should update input, click save button and trigger emit('close').", async () => {
    const state = {
      users: [],
      fetchUsersIsLoading: false,
      fetchUsersHasError: false,
      addUserIsLoading: false,
      addUserHasError: false,
      deleteUserIsLoading: false,
      deleteUserHasError: false
    };
    const actions = {
      addUser: jest.fn()
    };

    const store = new Vuex.Store({
      state,
      actions
    });
    (actions.addUser as jest.Mock).mockResolvedValueOnce(true);

    const wrapper = mount(AddUserModal, { store, localVue });

    wrapper.find('input[type="text"]').setValue("test");

    await wrapper
      .findAll("button")
      .at(1)
      .trigger("submit");

    await Vue.nextTick(); // Workaround to fix travis build

    expect(actions.addUser.mock.calls[0][1]).toEqual("test");
    expect(wrapper.emitted().close).toBeTruthy();
    expect(wrapper.find(".error").exists()).toBeFalsy();
    expect(wrapper.find(".loading").exists()).toBeFalsy();
    expect(wrapper.findComponent(LoadingIcon).exists()).toBeFalsy();
    expect(wrapper).toMatchSnapshot();
  });

  it("should update input, click save button and NOT trigger emit('close').", async () => {
    const state = {
      users: [],
      fetchUsersIsLoading: false,
      fetchUsersHasError: false,
      addUserIsLoading: false,
      addUserHasError: false,
      deleteUserIsLoading: false,
      deleteUserHasError: false
    };
    const actions = {
      addUser: jest.fn()
    };

    const store = new Vuex.Store({
      state,
      actions
    });
    (actions.addUser as jest.Mock).mockResolvedValueOnce(false);

    const wrapper = mount(AddUserModal, { store, localVue });

    wrapper.find('input[type="text"]').setValue("test");

    await wrapper
      .findAll("button")
      .at(1)
      .trigger("submit");

    expect(actions.addUser.mock.calls[0][1]).toEqual("test");
    expect(wrapper.emitted().close).toBeFalsy();
    expect(wrapper.find(".error").exists()).toBeFalsy();
    expect(wrapper.find(".loading").exists()).toBeFalsy();
    expect(wrapper.findComponent(LoadingIcon).exists()).toBeFalsy();
    expect(wrapper).toMatchSnapshot();
  });

  it("should display loading icon if addUserIsLoading=true.", async () => {
    const state = {
      users: [],
      fetchUsersIsLoading: false,
      fetchUsersHasError: false,
      addUserIsLoading: true,
      addUserHasError: false,
      deleteUserIsLoading: false,
      deleteUserHasError: false
    };
    const actions = {
      addUser: jest.fn()
    };

    const store = new Vuex.Store({
      state,
      actions
    });
    (actions.addUser as jest.Mock).mockResolvedValueOnce(false);

    const wrapper = mount(AddUserModal, { store, localVue });

    expect(wrapper.emitted().close).toBeFalsy();
    expect(wrapper.find(".error").exists()).toBeFalsy();
    expect(wrapper.find(".loading").exists()).toBeTruthy();
    expect(wrapper.findComponent(LoadingIcon).exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  it("should display error message if addUserHasError=true.", async () => {
    const state = {
      users: [],
      fetchUsersIsLoading: false,
      fetchUsersHasError: false,
      addUserIsLoading: false,
      addUserHasError: true,
      deleteUserIsLoading: false,
      deleteUserHasError: false,
      addUserErrorMsg: "error"
    };
    const actions = {
      addUser: jest.fn()
    };

    const store = new Vuex.Store({
      state,
      actions
    });
    (actions.addUser as jest.Mock).mockResolvedValueOnce(false);

    const wrapper = mount(AddUserModal, { store, localVue });

    expect(wrapper.emitted().close).toBeFalsy();
    expect(wrapper.find(".error").exists()).toBeTruthy();
    expect(wrapper.find(".error").text()).toEqual("Unable to add user: error");
    expect(wrapper.find(".loading").exists()).toBeFalsy();
    expect(wrapper.findComponent(LoadingIcon).exists()).toBeFalsy();
    expect(wrapper).toMatchSnapshot();
  });
});
