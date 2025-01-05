<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Customer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;

class CustomerApiTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();
    }

    public function test_can_get_all_customers()
    {
        $customers = Customer::factory()->count(3)->create();

        $response = $this->getJson('/api/customers');

        $response->assertStatus(200)
                ->assertJsonCount(3);
    }

    public function test_can_create_customer_through_api()
    {
        $customerData = [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
            'contact_number' => '1234567890'
        ];

        $response = $this->postJson('/api/customers', $customerData);

        $response->assertStatus(Response::HTTP_CREATED)
                ->assertJsonFragment($customerData);

        $this->assertDatabaseHas('customers', $customerData);
    }

    public function test_can_update_customer_through_api()
    {
        $customer = Customer::factory()->create();
        $updateData = [
            'first_name' => 'Jane',
            'email' => 'jane.doe@example.com'
        ];

        $response = $this->putJson("/api/customers/{$customer->id}", $updateData);

        $response->assertStatus(Response::HTTP_OK)
                ->assertJsonFragment($updateData);

        $this->assertDatabaseHas('customers', array_merge(
            ['id' => $customer->id],
            $updateData
        ));
    }

    public function test_can_delete_customer_through_api()
    {
        $customer = Customer::factory()->create();

        $response = $this->deleteJson("/api/customers/{$customer->id}");

        $response->assertStatus(Response::HTTP_NO_CONTENT);
        $this->assertDatabaseMissing('customers', ['id' => $customer->id]);
    }

    public function test_cannot_create_customer_with_invalid_data()
    {
        $invalidData = [
            'first_name' => '',
            'last_name' => '',
            'email' => 'invalid-email',
            'contact_number' => ''
        ];

        $response = $this->postJson('/api/customers', $invalidData);

        $response->assertStatus(Response::HTTP_BAD_REQUEST);
        
        $responseData = $response->json();
        $this->assertArrayHasKey('first_name', $responseData);
        $this->assertArrayHasKey('last_name', $responseData);
        $this->assertArrayHasKey('email', $responseData);
        $this->assertArrayHasKey('contact_number', $responseData);
    }

    public function test_can_get_single_customer()
    {
        $customer = Customer::factory()->create();

        $response = $this->getJson("/api/customers/{$customer->id}");

        $response->assertStatus(Response::HTTP_OK)
                ->assertJsonFragment([
                    'id' => $customer->id,
                    'first_name' => $customer->first_name,
                    'last_name' => $customer->last_name,
                    'email' => $customer->email,
                    'contact_number' => $customer->contact_number
                ]);
    }
}
