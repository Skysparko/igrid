import { findMatchingRoute, mapNavigationItems } from "../navigationConfig";
import { USER_ROLE } from "../userRoles";

import type { NavigationItem, NavigationGroups } from "../navigationConfig";

describe("findMatchingRoute", () => {
  it("should find exact matches", () => {
    const roles = findMatchingRoute("dashboard/admin/courses");
    expect(roles).toEqual([USER_ROLE.admin, USER_ROLE.contentCreator]);
  });

  it("should handle wildcard patterns", () => {
    const roles = findMatchingRoute("dashboard/admin/users/123");
    expect(roles).toEqual([USER_ROLE.admin]);
  });

  it("should return undefined for non-existing routes", () => {
    const roles = findMatchingRoute("non/existing/route");
    expect(roles).toBeUndefined();
  });
});

describe("mapNavigationItems", () => {
  it("should correctly map navigation items with roles", () => {
    const items: NavigationItem[] = [
      {
        label: "courses",
        path: "dashboard/admin/courses",
        iconName: "Course",
      },
    ];

    const groups: NavigationGroups[] = [
      {
        title: "test",
        items,
      },
    ];

    const mappedGroups = mapNavigationItems(groups);
    const mapped = mappedGroups[0].items;

    expect(mapped[0]).toEqual({
      label: "courses",
      path: "dashboard/admin/courses",
      iconName: "Course",
      link: "/dashboard/admin/courses",
      roles: [USER_ROLE.admin, USER_ROLE.contentCreator],
    });
  });

  it("should handle items with wildcard routes", () => {
    const items: NavigationItem[] = [
      {
        label: "users",
        path: "dashboard/admin/users",
        iconName: "User",
      },
    ];

    const groups: NavigationGroups[] = [
      {
        title: "test",
        items,
      },
    ];

    const mappedGroups = mapNavigationItems(groups);
    const mapped = mappedGroups[0].items;

    expect(mapped[0].roles).toEqual([USER_ROLE.admin]);
  });

  it("should preserve all original item properties", () => {
    const items: NavigationItem[] = [
      {
        label: "dashboard",
        path: "dashboard",
        iconName: "Dashboard",
      },
    ];

    const groups: NavigationGroups[] = [
      {
        title: "test",
        items,
      },
    ];

    const mappedGroups = mapNavigationItems(groups);
    const mapped = mappedGroups[0].items;

    expect(mapped[0]).toMatchObject({
      label: "dashboard",
      path: "dashboard",
      iconName: "Dashboard",
      link: "/dashboard",
      roles: expect.any(Array),
    });
  });

  it("should handle items without matching routes", () => {
    const items: NavigationItem[] = [
      {
        label: "invalid",
        path: "non/existing/route",
        iconName: "Course",
      },
    ];

    const groups: NavigationGroups[] = [
      {
        title: "test",
        items,
      },
    ];

    const mappedGroups = mapNavigationItems(groups);
    const mapped = mappedGroups[0].items;

    expect(mapped[0].roles).toBeUndefined();
  });
});
