export { };

declare global {
    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data?: T;
    }
    interface IMess{
        code: string;
        message: string;
    }
    interface ILocationPermissions{
      userID: number;
      locationID: number;
      location: string;
      address: string;
      email: string;
      tel: string;
      groupID: number;
      groupName:string;
      accountTypeID: number;
      accountTypeName: string;
    }
    interface ILogin {
        token: string;
        userInfo: {
            userID: number;
            userName: string;
            isWindowAuthenticated: boolean;
            firstName: string;
            fullName: string;
            remarks: string;
            teacherID: number;
            studentID: number;
            isActive: boolean;
            smsUsername: string;
            smsPassword: string;
            photo: string;
            accountTypeID: number;
            accountTypeName: string;
        };
        locationPermissions :       {
            userID: number;
            locationID: number;
            location: string;
            address: string;
            email: string;
            tel: string;
            groupID: number;
            groupName:string;
            accountTypeID: number;
            accountTypeName: string;
        }[];
        functionByGroup :       {
            recordID: number;
            groupID: number;
            groupName: string;
            moduleID: number;
            module: string;
            functionGroupID: number;
            functionGroup: string;
            functionID: number;
            functionName: string;
            cRead: boolean;
            cModify: boolean;
            cFull: boolean;
            type: string; 
            formName: string;
            unselectedImageIndex: number;
            selectedImageIndex: number;
            sort: number;
            description: string;
            inActive: boolean;
        }[];
    }

    interface IModelPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        },
        result: T[]
    }



    interface IRegister {
        _id: string;
        email: string;
        fullName: string;
    }

    interface IUserInfo {
            userID: number;
            userName: string;
            isWindowAuthenticated: boolean;
            firstName: string;
            fullName: string;
            remarks: string;
            teacherID: number;
            studentID: number;
            isActive: boolean;
            smsUsername: string;
            smsPassword: string;
            photo: string;
            accountTypeID: number;
            accountTypeName: string;
    }

    interface IFetchAccount {
        user: IUserInfo
    }

    interface IUserTable {
        _id: string;
        fullName: string;
        email: string;
        phone: string;
        role: string;
        avatar: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }

    interface IUserMenuChild {
        moduleID: number;
        module: string;

        functionID: number;
        functionName: string;

        functionGroupID: number;
        functionGroup: string;
        cRead: boolean;
        cModify: boolean;
        cFull: boolean;

        userID: number;
        locationID: number;
        menuType: number;
        webUrl: string;
    }

     interface IUserMenuMaster {
        moduleID: number;
        module: string;
        userID: number;
        locationID: number;
        sort: number;
        menuType: number;
         children: IUserMenuChild  
     }

    //-----------------------
    interface IResponseImport {
        countSuccess: number;
        countError: number;
        detail: any;
    }

    interface IBookTable {
        _id: string;
        thumbnail: string;
        slider: string[];
        mainText: string;
        author: string;
        price: number;
        sold: number;
        quantity: number;
        category: string;
        createdAt: Date;
        updatedAt: Date;
    }

    interface ICart {
        _id: string;
        quantity: number;
        detail: IBookTable;
    }

    interface IHistory {
        _id: string;
        name: string;
        type: string;
        email: string;
        phone: string;
        userId: string;
        detail:
        {
            bookName: string;
            quantity: number;
            _id: string;
        }[];
        totalPrice: number;
        createdAt: Date;
        updatedAt: Date;
    }

    interface IOrderTable extends IHistory {

    }

}
