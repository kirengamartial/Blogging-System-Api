import supertest from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';

const request = supertest(app);

let testUser;
let authToken;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL);

  testUser = await User.create({
    name: "testuser",
    email: "test@example.com",
    password: "password123"
  });

  authToken = jwt.sign({ userId: testUser._id }, process.env.SECRET);
});

afterAll(async () => {
  await User.findByIdAndDelete(testUser._id);
  await mongoose.connection.close();
});

describe("BLOGS", () => {
  let createdBlogId;

  describe("POST /api/blogs/create", () => {
    test("should create a new blog post when authenticated", async () => {
      const response = await request
        .post("/api/blogs/create")
        .set('Cookie', [`jwt=${authToken}`])
        .send({
          title: "Test Blog",
          description: "This is a test blog post"
        });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.title).toBe("Test Blog");
      expect(response.body.description).toBe("This is a test blog post");

      createdBlogId = response.body._id;
    });

    test("should return 401 when not authenticated", async () => {
      const response = await request
        .post("/api/blogs/create")
        .send({
          title: "Unauthorized Blog",
          description: "This should not be created"
        });

      expect(response.statusCode).toBe(401);
    });
  });

  describe("PUT /api/blogs/edit/:id", () => {
    test("should update the blog post when authenticated", async () => {
      const response = await request
        .put(`/api/blogs/edit/${createdBlogId}`)
        .set('Cookie', [`jwt=${authToken}`])
        .send({
          title: "Updated Test Blog",
          description: "This is an updated test blog post"
        });

      expect(response.statusCode).toBe(200);
      expect(response.body.title).toBe("Updated Test Blog");
      expect(response.body.description).toBe("This is an updated test blog post");
    });

    test("should return 401 when not authenticated", async () => {
      const response = await request
        .put(`/api/blogs/edit/${createdBlogId}`)
        .send({
          title: "Unauthorized Update",
          description: "This should not update"
        });

      expect(response.statusCode).toBe(401);
    });
  });

  describe("DELETE /api/blogs/delete/:id", () => {
    test("should delete the blog post when authenticated", async () => {
      const response = await request
        .delete(`/api/blogs/delete/${createdBlogId}`)
        .set('Cookie', [`jwt=${authToken}`]);

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("deleted successfully");
      expect(response.body._id).toBe(createdBlogId);
    });

    test("should return 401 when not authenticated", async () => {
      const response = await request
        .delete(`/api/blogs/delete/${createdBlogId}`);

      expect(response.statusCode).toBe(401);
    });
  });
});