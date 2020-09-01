import { shallowMount, createLocalVue } from "@vue/test-utils";
import Buefy from "buefy";
import UserList from "@/components/UserList.vue";
import UserListElement from "@/components/UserListElement.vue";
import { User } from "@/models/User";

const localVue = createLocalVue();
localVue.use(Buefy);

describe(UserList.name + " component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the user list for empty user list and match snapshot.", () => {
    const users: User[] = [];

    const wrapper = shallowMount(UserList, {
      localVue,
      propsData: { users }
    });

    expect(wrapper.findAllComponents(UserListElement)).toHaveLength(0);
    expect(wrapper.text()).toMatch("No users available :)");
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the user list for one user and match snapshot.", () => {
    const users: User[] = [{ id: 1, name: "user1" }];

    const wrapper = shallowMount(UserList, {
      localVue,
      propsData: { users }
    });

    expect(wrapper.findAllComponents(UserListElement)).toHaveLength(1);
    expect(
      wrapper
        .findAllComponents(UserListElement)
        .at(0)
        .props().user
    ).toEqual({ id: 1, name: "user1" });
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the user list for two users and match snapshot.", () => {
    const users: User[] = [
      { id: 1, name: "user1" },
      { id: 2, name: "user2" }
    ];

    const wrapper = shallowMount(UserList, {
      localVue,
      propsData: { users }
    });

    expect(wrapper.findAllComponents(UserListElement)).toHaveLength(2);
    expect(
      wrapper
        .findAllComponents(UserListElement)
        .at(0)
        .props().user
    ).toEqual({ id: 1, name: "user1" });
    expect(
      wrapper
        .findAllComponents(UserListElement)
        .at(1)
        .props().user
    ).toEqual({ id: 2, name: "user2" });
    expect(wrapper).toMatchSnapshot();
  });
});
