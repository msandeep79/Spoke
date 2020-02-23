import gql from "graphql-tag";

export const schema = gql`
  enum CampaignStatus {
    ACTIVE
    ARCHIVED
    CLOSED_FOR_INITIAL_SENDS
    CLOSED_FOR_ALL_SENDS
    NOT_STARTED
  }

  input CampaignsFilter {
    isArchived: Boolean
    campaignId: Int
    campaignIds: [Int]
    listSize: Int
    pageSize: Int
    searchString: String
  }

  type CampaignStats {
    sentMessagesCount: Int
    receivedMessagesCount: Int
    optOutsCount: Int
  }

  type CampaignAssignmentSummary {
    assignmentId: ID!
    texterId: ID!
    texterFirstName: String!
    texterLastName: String
    unmessagedCount: Int!
    needsResponseCount: Int!
    convoCount: Int!
    closedCount: Int!
    contactCount: Int!
  }

  type Campaign {
    id: ID
    organization: Organization
    title: String
    description: String
    dueBy: Date
    status: CampaignStatus
    isStarted: Boolean
    startedAt: DateTime
    isArchived: Boolean
    creator: User
    texters: [User]
    assignments(assignmentsFilter: AssignmentsFilter): [Assignment]
    interactionSteps: [InteractionStep]
    contacts: [CampaignContact]
    contactsCount: Int
    hasUnassignedContacts: Boolean
    hasUnassignedContactsForTexter: Boolean
    hasUnsentInitialMessages: Boolean
    customFields: [String]
    cannedResponses(userId: String): [CannedResponse]
    assignmentSummaries: [CampaignAssignmentSummary]
    stats: CampaignStats
    datawarehouseAvailable: Boolean
    useDynamicAssignment: Boolean
    introHtml: String
    primaryColor: String
    logoImageUrl: String
    editors: String
    overrideOrganizationTextingHours: Boolean
    textingHoursEnforced: Boolean
    textingHoursStart: Int
    textingHoursEnd: Int
    timezone: String
    shiftingConfiguration: String
    phoneNumbers: [PhoneNumbersByAreaCode]
    joinUrl: String
    contactImportJob: BackgroundJob
  }

  type CampaignsList {
    campaigns: [Campaign]
  }

  union CampaignsReturn = PaginatedCampaigns | CampaignsList

  type PaginatedCampaigns {
    campaigns: [Campaign]
    pageInfo: PageInfo
  }
`;
