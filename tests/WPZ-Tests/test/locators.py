from selenium.webdriver.common.by import By

class MainPageLocators(object):
    """A class for main page locators. All main page locators should come here"""

    REGISTER_PAGE_BUTTON = (By.XPATH, "//*[contains(text(),'Zarejestruj')]")
    LOGIN_BUTTON = (By.XPATH, "//*[contains(text(),'Zaloguj')]")
    FAQ_BUTTON = (By.XPATH, "//*[contains(text(),'FAQ')]")
    EXAMS_BUTTON = (By.XPATH, "//a[@href='/tests']")
    MAIN_PAGE_BUTTON = (By.XPATH, "//*[contains(text(),'Strona Główna')]")
    LOG_OFF_BUTTON = (By.XPATH, "//*[contains(text(),'Wyloguj')]")
    PROFILE_BUTTON = (By.XPATH, "//*[contains(text(),'Profil')]")


class RegisterPageLocators(MainPageLocators):
    """A class for main page locators. All main page locators should come here"""

    NAME_FIELD = (By.NAME, 'name')
    SURNAME_FIELD = (By.NAME, 'surname')
    NICK_FIELD = (By.NAME, 'username')
    EMAIL_FIELD = (By.NAME, 'email')
    PASSWORD_FIELD = (By.NAME, 'password')
    CONFIRM_PASSWORD_FIELD = (By.NAME, 'confirmPassword')
    REGISTER_BUTTON = (By.XPATH, "//input[@value='Zarejestruj']")
    ALREADY_HAVE_AN_ACCOUNT_LINK = (By.XPATH, "//*[contains(text(),'Masz już konto?')]")
    PASSWORDS_NOT_MATCHING_ERROR = (By.XPATH, "//*[contains(text(),'Hasła muszą być zgodne')]")
    USER_EXISTS_ERROR = (By.XPATH, "//*[contains(text(),'Użytkownik o tym nicku już istnieje w bazie danych. Spróbuj innej nazwy')]")


class LoginPageLocators(MainPageLocators):
    """A class for main page locators. All main page locators should come here"""

    NICK_FIELD = (By.NAME, 'username')
    PASSWORD_FIELD = (By.NAME, 'password')
    LOGIN_BUTTON = (By.XPATH, "//input[@value='Login']")
    DONT_HAVE_AN_ACCOUNT_LINK = (By.XPATH, "//*[contains(text(),'Nie masz konta? Zarejestruj się')]")
    CREDENTIALS_NOT_MATCHING_ERROR = (By.XPATH, "//*[contains(text(),'Niepoprawny login lub hasło!')]")

class FAQPageLocators(MainPageLocators):
    """A class for main page locators. All main page locators should come here"""

    DETAILS_1_BUTTON = (By.XPATH, "//*[contains(text(),'Jak założyć konto?')]/parent::details")
    DETAILS_2_BUTTON = (By.XPATH, "//*[contains(text(),'Czy mogę podejść do testu więcej niż raz?')]/parent::details")
    DETAILS_3_BUTTON = (By.XPATH, "//*[contains(text(),'Kiedy zobaczę wynik testu?')]/parent::details")
    DETAILS_4_BUTTON = (By.XPATH, "//*[contains(text(),'Nie mam dostępu do testu, jak go uzyskać?')]/parent::details")
    DETAILS_5_BUTTON = (By.XPATH, "//*[contains(text(),'Czy istnieje tryb nauki, przed podejściem do testu?')]/parent::details")
    DETAILS_6_BUTTON = (By.XPATH, "//*[contains(text(),'Nie mogę się zalogować, jak odzyskać dostęp do konta?')]/parent::details")
    DETAILS_7_BUTTON = (By.XPATH, "//*[contains(text(),'Nie zdążyłem podejść do testu. Co teraz?')]/parent::details")
    DETAILS_8_BUTTON = (By.XPATH, "//*[contains(text(),'Czy mogę wykonać test anonimowo?')]/parent::details")


class ExamPageLocators(MainPageLocators):
    """A class for main page locators. All main page locators should come here"""

    START_EXAM_BUTTON = (By.XPATH, "//*[contains(text(),'Rozpocznij Podejść')]")
    CONTINUE_EXAM_BUTTON = (By.XPATH, "//*[contains(text(),'Kontynuuj podejście')]")
    ID_MENU_BUTTON = (By.ID, ":r7:")
    EXAMS_LIST_ROOT = (By.XPATH, """//div[@class="MuiDataGrid-virtualScrollerRenderZone css-s1v7zr-MuiDataGrid-virtualScrollerRenderZone"]""")
    EXAM_NAME_MENU_BUTTON = (By.ID, ":rd:")
    EXAM_START_BUTTON = (By.XPATH, "//*[text()='Początek egzaminu']")
    QUESTIONS_QUANTITY_MENU_BUTTON = (By.ID, ":rj:")
    STATUS_MENU_BUTTON = (By.ID, ":rp:")
    EXAM_START_MENU_BUTTON = (By.ID, ":rv:")
    EXAM_END_MENU_BUTTON = (By.ID, ":r1n:")
    ACTION_MENU_BUTTON = (By.ID, ":r1t:")
    APPROACHES_MENU_BUTTON = (By.ID, ":r23:")
    SORT_BY_DESC = (By.XPATH, "//*[text()='Sort by DESC']")
    SORT_BY_ASC = (By.XPATH, "//*[text()='Sort by ASC']")
    FILTER_MENU = (By.XPATH, "//*[text()='Filter']")
    HIDE_COLUMN = (By.XPATH, "//*[text()='Hide']")
    SHOW_COLUMNS = (By.XPATH, "//*[text()='Show Columns']")
    UNSORT = (By.XPATH, "//*[text()='Unsort']")
    FIND_COLUMN_FIELD = (By.XPATH, "//input[@placeholder='Column title']")
    HIDE_ALL_BUTTON = (By.XPATH, "//*[text()='Hide all']")
    SHOW_ALL_BUTTON = (By.XPATH, "//*[text()='Show all']")
    ID_SLIDER = (By.XPATH, "//*[text()='ID']")
    EXAM_NAME_SLIDER = (By.XPATH, "//*[text()='Nazwa egzaminu']")
    QUESTIONS_QUANTITY_SLIDER = (By.XPATH, "//*[text()='Ilość pytań']")
    STATUS_SLIDER = (By.XPATH, "//*[text()='Status']")
    EXAM_START_SLIDER = (By.XPATH, "//*[text()='Początek egzaminu']")
    EXAM_END_SLIDER = (By.XPATH, "//*[text()='Koniec egzaminu']")
    ACTION_SLIDER = (By.XPATH, "//*[text()='Akcja']")
    APPROACHES_SLIDER = (By.XPATH, "//*[text()='Podejścia']")
    FILTER_VALUE = (By.XPATH, "//input[@placeholder='Filter value']")


class DebugExamQuestion1PageLocators(MainPageLocators):
    """A class for main page locators. All main page locators should come here"""

    PROGRAMMING_LANGUAGE_ANSWER = (By.XPATH, "//*[contains(text(),'język programowania')]")
    PROGRAMMING_LANGUAGE_ANSWER_CHECKBOX = (By.XPATH, """//input[@value="1"]""")
    MARKDOWN_LANGUAGE_ANSWER = (By.XPATH, "//*[contains(text(),'język znaczników')]")
    MARKDOWN_LANGUAGE_ANSWER_CHECKBOX = (By.XPATH, """//input[@value="2"]""")
    DATABASE_ANSWER = (By.XPATH, "//*[contains(text(),'baza danych')]")
    DATABASE_ANSWER_CHECKBOX = (By.XPATH, """//input[@value="3"]""")
    QUESTION = (By.TAG_NAME, """h3""")
    NEXT_QUESTION_BUTTON = (By.XPATH, """//input[@value="Next question"]""")


class DebugExamQuestion2PageLocators(MainPageLocators):
    """A class for main page locators. All main page locators should come here"""

    QUESTION = (By.TAG_NAME, """h3""")
    WAR_CRIMINAL_ANSWER = (By.XPATH, "//*[contains(text(),'zbrodniarzem wojennym')]")
    WAR_CRIMINAL_ANSWER_CHECKBOX = (By.XPATH, """//input[@value="1"]""")
    DICTATOR_ANSWER = (By.XPATH, "//*[contains(text(), 'dyktatorem')]")
    DICTATOR_ANSWER_CHECKBOX = (By.XPATH, """//input[@value="2"]""")
    Microsoft_CEO_ANSWER = (By.XPATH, "//*[contains(text(),'szefem Micro$oftu xD')]")
    Microsoft_CEO_ANSWER_CHECKBOX = (By.XPATH, """//input[@value="3"]""")
    NEXT_QUESTION_BUTTON = (By.XPATH, """//input[@value="Next question"]""")


class DebugExamQuestion3PageLocators(MainPageLocators):
    """A class for main page locators. All main page locators should come here"""

    QUESTION = (By.TAG_NAME, """h3""")
    _200_ANSWER = (By.XPATH, "//*[contains(text(),'200')]")
    _200_ANSWER_CHECKBOX = (By.XPATH, "//input[@value='1']")
    _201_ANSWER = (By.XPATH, "//*[contains(text(),'201')]")
    _201_ANSWER_CHECKBOX = (By.XPATH, "//input[@value='2']")
    _403_ANSWER = (By.XPATH, "//*[contains(text(),'403')]")
    _403_ANSWER_CHECKBOX = (By.XPATH, "//input[@value='3']")
    _500_ANSWER = (By.XPATH, "//*[contains(text(),'500')]")
    _500_ANSWER_CHECKBOX = (By.XPATH, "//input[@value='4']")
    NEXT_QUESTION_BUTTON = (By.XPATH, "//input[@value='Next question']")


class SearchResultsPageLocators(object):
    """A class for search results locators. All search results locators should
    come here"""

    pass